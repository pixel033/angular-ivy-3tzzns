export interface IUser {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface GetUserResponse<T> {
  request1: T;
  request2: T;
}
