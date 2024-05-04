import { Roles } from '../enums/index.js';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  role: Roles;
};
