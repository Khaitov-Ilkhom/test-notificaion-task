import axios from "axios";

const useApi = () => {

  const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    params: {},
  });

  request.interceptors.request.use(
      (config) => {
        // config.headers["Authorization"] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraGFpdG92aWxob20wNEBnbWFpbC5jb20iLCJpYXQiOjE3NTMyODIxOTMsImV4cCI6MTc1NDE0NjE5M30.z0Mcs-38_r939h2y7fhvLEOhARyYJVVVoYcvh54jjot6E1oFLtQ-eqySkiBegJwTkmEWvQF3TDXnFShYiSC2Og"

        return config;
      }
  )

  return {
    request,
  };
};

export default useApi;
