import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "User",
    "Job",
    "Application",
    "Blog",
    "Recruiter",
    "Applicant",
    "Account",
    "Contact",
    "Skill",
    "Career",
    "Permission",
    "Role",
    "Subscriber",
  ],
  endpoints: () => ({}),
});
