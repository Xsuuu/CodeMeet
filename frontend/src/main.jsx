if (import.meta.env.DEV) {
  // 屏蔽所有 console 方法
  const levels = ['log', 'warn', 'error', 'info', 'debug'];

  levels.forEach((level) => {
    const original = console[level];
    console[level] = (...args) => {
      const str = JSON.stringify(args).toLowerCase();

      // 统一屏蔽列表
      if (
        (str.includes('clerk') && str.includes('development keys')) ||
        str.includes('location-hint') ||
        str.includes('device in use') ||
        (str.includes('participant with sessionid') &&
          str.includes('not found')) ||
        str.includes('sfu ws connection failed') ||
        str.includes('failed to join call') ||
        str.includes('join sfu request failed') ||
        str.includes('camera init failed') ||
        str.includes('failed to get video stream') ||
        str.includes('failed to getusermedia') ||
        str.includes('call control handler failed') ||
        (str.includes('permissions') && str.includes('failed')) ||
        (str.includes('coordinator') && str.includes('timeout')) ||
        str.includes('domnodeinsertedintodocument') ||
        str.includes('third-party cookie') ||
        (str.includes('i18next') && str.includes('locize')) ||
        str.includes("chrome's built-in ai") ||
        str.includes('languagedetector') ||
        str.includes('an error occurred while reading an observable')
      ) {
        return; // 静默丢弃
      }

      original.apply(console, args);
    };
  });
}

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
            <App />
          </ClerkProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
