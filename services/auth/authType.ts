import { IBackendRes } from "@/types/api";
import { Applicant, Recruiter } from "@/types/model";
import { LoginResponseDto } from "@/types/dto";

// Base Types
type ContactInfo = {
  email: string;
  phone?: string;
};

// Sign Up
export type ApplicantSignUpRequest = {
  contact: Pick<ContactInfo, "email">;
  password: string;
  type: "applicant";
};

export type RecruiterSignUpRequest = {
  password: string;
  contact: ContactInfo;
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

// Verification
export type VerifyCodeRequest = {
  email: string;
  verificationCode: string;
};

export type ResendCodeRequest = {
  email: string;
};

// Common Response Types
type UserResponse = IBackendRes<LoginResponseDto>;

export type SignInResponse = UserResponse;
export type FetchAccountResponse = UserResponse;
export type RefreshTokenResponse = UserResponse;

export type LogoutResponse = IBackendRes<string>;
export type VerifyCodeResponse = IBackendRes<unknown>;
export type ResendCodeResponse = IBackendRes<unknown>;