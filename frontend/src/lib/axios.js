import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  //请求的时候，把“身份信息”也一起带上
  //by adding this field,browser will send the cookies to
  // server automatically on every single request
});

export default axiosInstance