export interface UserInfo {
  uuid: string;
  username: string;
  email: string;
  token: string;
}

export interface ApiError {
  status: number;
  message?: string;
  messages?: string[];
  data?: string;
}
