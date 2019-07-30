import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://teamonion-idev.tmon.co.kr/',
    // method: 'get',
    headers: {
      // 'Content-Type': 'application/json',
    },
  };

  // Create instance
  const axiosInstance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  axiosInstance.interceptors.request.use(config => {
    const localToken = localStorage.getItem('TOKEN');
    const sessionToken = sessionStorage.getItem('TOKEN');
    config.headers.Authorization = localToken
      ? `Bearer ${localToken}`
      : '' || sessionToken
      ? `Bearer ${sessionToken}`
      : '';
    return config;
  });

  return axiosInstance;
};

export default fetchClient;
