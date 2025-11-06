import { IBackendRes } from "@/types/api";
import { Mutex } from "async-mutex";
import axiosClient from "axios";
import { toast } from "sonner";

interface AccessTokenResponse {
  access_token: string;
}

const axiosInstance = axiosClient.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const refreshInstance = axiosClient.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    try {
      const res = await refreshInstance.get<IBackendRes<AccessTokenResponse>>(
        "/api/v1/auth/refresh",
      );
      const newAccessToken = res?.data?.data?.access_token ?? null;

      if (!newAccessToken) {
        localStorage.removeItem("access_token");
        return null;
      }

      return newAccessToken;
    } catch (error) {
      toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      console.error("error handleRefreshToken axios: ", error);

      localStorage.removeItem("access_token");
      return null;
    }
  });
};

axiosInstance.interceptors.request.use(function (config) {
  if (
    typeof window !== "undefined" &&
    window &&
    window.localStorage &&
    window.localStorage.getItem("access_token")
  ) {
    if (config.url !== "/api/v1/auth/refresh") {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
  }
  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== "/api/v1/auth/login" &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return axiosInstance.request(error.config);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh" &&
      location.pathname.startsWith("/admin")
    ) {
      toast.error(
        error?.response?.data?.error ?? "Đã có lỗi xảy ra, vui lòng thử lại.",
      );
    }

    if (+error.response.status === 403) {
      toast.error("Bạn không có quyền thực hiện hành động này.");
    }

    return error?.response?.data ?? Promise.reject(error);
  },
);

export default axiosInstance;
