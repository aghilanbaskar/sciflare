import axios from 'axios';
export const baseURL = 'http://localhost:3000'; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const newTokens = await refreshAuthToken(refreshToken);
      localStorage.setItem('accessToken', newTokens.accessToken);
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + newTokens.accessToken;
      originalRequest.headers['Authorization'] =
        'Bearer ' + newTokens.accessToken;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  const response = await axios.post(`${baseURL}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};

export default axiosInstance;
