import { IBackendRes } from "@/types/api";
import { Applicant, Contact, Recruiter, User } from "@/types/model";

//  Sign Up
export type SignUpRequest = {
  contact: Contact;
  password: string;
  type: "recruiter" | "applicant";
  username?: string;
  address?: string;
  fullName?: string;
};

export type SignUpResponse = IBackendRes<Recruiter | Applicant>;

// Sign In
export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = IBackendRes<{ user: User }>;

// Fetch Account
export type FetchAccountResponse = IBackendRes<{ user: User }>;

// Refresh Token
export type RefreshTokenResponse = IBackendRes<{ user: User }>;

// Logout
export type LogoutResponse = IBackendRes<string>;

// Verify Code
export type VerifyCodeRequest = {
  email: string;
  verificationCode: string;
};

export type VerifyCodeResponse = IBackendRes<unknown>;

// Resend Code
export type ResendCodeRequest = {
  email: string;
};

export type ResendCodeResponse = IBackendRes<unknown>;
