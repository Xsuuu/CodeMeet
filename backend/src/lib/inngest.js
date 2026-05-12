import { Inngest } from 'inngest';

import { connectDB } from './db.js';
import User from '../models/User.js';
import { upsertStreamUser, deleteStreamUser } from './stream.js';

export const inngest = new Inngest({ id: 'CodeMeet' });

const syncUser = inngest.createFunction(
  {
    id: 'sync-user',
    retries: 3,
    triggers: [{ event: 'clerk/user.created' }],
  },

  async ({ event, step }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const userData = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      profileImage: image_url,
    };

    // 同步到 MongoDB
    await step.run('sync-to-mongodb', async () => {
      await connectDB();
      return await User.findOneAndUpdate(
        { clerkId: id },
        { $set: userData },
        { upsert: true, new: true },
      );
    });

    // 同步到 Stream (第三方服务)
    await step.run('sync-to-stream', async () => {
      await upsertStreamUser({
        id: userData.clerkId.toString(),
        name: userData.name,
        image: userData.profileImage,
      });
    });
  },
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: 'delete-user-from-db',
    triggers: [{ event: 'clerk/user.deleted' }],
  },

  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    await deleteStreamUser(id.toString());
  },
);

export const functions = [syncUser, deleteUserFromDB];
