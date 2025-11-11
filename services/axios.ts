/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

// ============================================================
// Cấu hình mặc định cho các request
// ============================================================
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL, // URL của backend
  withCredentials: true, // cho phép gửi cookie trong request
  timeout: 1000 * 60 * 10, // thời gian timeout là 10 phút
});

// ============================================================
// Biến để track trạng thái refresh token
// ============================================================
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// ============================================================
// Hàm xử lý queue khi refresh token hoàn thành
// ============================================================
const processQueue = (error: any, success: boolean = false) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(success);
    }
  });

  failedQueue = [];
};

const refreshToken = async (): Promise<boolean> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/auth/refresh`,
      {},
      {
        withCredentials: true, // Gửi refresh token trong cookie
      },
    );

    // Cookie sẽ được tự động set bởi server
    return true;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

// ============================================================
// Hàm logout redux state
// ============================================================
const performLogout = async () => {
  const { store } = await import("@/lib/store");
  const { clearUser } = await import("@/lib/features/authSlice");

  // Clear Redux state
  store.dispatch(clearUser());

  // Redirect to login page
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

// ============================================================
// Interceptor: Xử lý lỗi 401, set isAuthenticated trong slice về false
// ============================================================
const handle401CodeWithoutRefresh = async () => {
  const { store } = await import("@/lib/store");
  const { setIsAuthenticated } = await import("@/lib/features/authSlice");

  // Clear Redux state
  store.dispatch(setIsAuthenticated(false));
};

// ============================================================
// Interceptor: Xử lý lỗi 401 và errorCode UNAUTHORIZED
// ============================================================

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // =====================
    // CHECK LỖI JWT
    // =====================
    const isUnauthorized = error.response?.status === 401;
    const isRefreshTokenExpired =
      typeof error.response?.data === "object" &&
      error.response?.data !== null &&
      "message" in error.response.data &&
      (error.response.data as { message?: string }).message ===
        "Refresh token is invalid or expired";

    if (isUnauthorized && !originalRequest._retry) {
      // xử lý unauthorized trước khi handle tới refresh token
      handle401CodeWithoutRefresh();

      // Nếu refresh token đã hết hạn, logout ngay
      if (isRefreshTokenExpired) {
        console.log("Refresh token expired, logging out...");
        performLogout();
        return Promise.reject(error);
      }

      // Đánh dấu request này đã retry để tránh infinite loop
      originalRequest._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh, đưa request vào queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry request gốc (cookie đã được update)
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      console.log("Access token expired, refreshing...");
      isRefreshing = true;

      try {
        // Gọi API refresh token
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          // Xử lý tất cả requests trong queue
          processQueue(null, true);

          // Retry request gốc (cookie đã được update tự động)
          return axiosClient(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Xử lý queue với error
        processQueue(refreshError, false);

        // Logout
        performLogout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ============================================================

export default axiosClient;
