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

export interface Todo {
  id: string;
  title: string;
  status: boolean;
  dueDate: string;
  description: string;
  updatedAt: string
}

export type UpdateAPIAction  = 'mark' | 'update'
