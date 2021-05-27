import { OkPacket, RowDataPacket } from 'mysql2/promise';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface CreateUser {
  status: number;
  message: string;
  result: OkPacket;
}

export interface UserById {
  status: number;
  message?: string;
  results?: User;
}

export interface DeletedUser {
  status: number;
  message: string;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  type: string;
}

export interface CreateBook {
  status: number;
  message: string;
  result: OkPacket;
}

export interface BookById {
  status: number;
  message?: string;
  results?: Book;
}

export interface ReadingHistory {
  id: number;
  book_id: number;
  user_id: number;
  start_year: number;
  finish_year?: number;
}

export interface CreateReadingHistory {
  status: number;
  message: string;
  result: OkPacket;
}

export interface ReadingHistoryById {
  status: number;
  message?: string;
  results?: ReadingHistory;
}
