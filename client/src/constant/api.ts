import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log("api config", config, token);
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest, "api error");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get("http://localhost:8000/api/user/me", {
          withCredentials: true,
        });
        // console.log(response.data);
        const newAccessToken = response.data.accessToken;
        // console.log(newAccessToken);
        // Save the new access token
        localStorage.setItem("authToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // console.log(refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
