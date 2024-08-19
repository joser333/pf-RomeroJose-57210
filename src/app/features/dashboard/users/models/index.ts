export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  role: UserRole
}