import { IBackendRes } from "@/types/api";
import { Applicant, Recruiter, User } from "@/types/model";

//  Applicant Sign up
export type ApplicantSignUpRequest = {
  contact: {
    email: string;
  };
  password: string;
  type: "applicant";
};

// Recruiter Sign up
export type RecruiterSignUpRequest = {
  password: string;
  contact: {
    email: string;
    phone: string;
  };
  address: string;
  fullName: string;
  username: string;
  type: "recruiter";
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
