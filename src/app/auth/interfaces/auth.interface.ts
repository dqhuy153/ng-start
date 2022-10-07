export const API_KEY = "AIzaSyCfmSZNwExVSiRciuM5LKOjySkcZtWOYnc";
export const AuthLocalStorageName = "userData";

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}
