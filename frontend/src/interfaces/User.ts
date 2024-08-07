export interface IUser {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  deleted: boolean;
  organizationId: string;
  role: userRoleEnum;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  fullName: string;
  avatar: string;
}

export interface IUserCreate {
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: userRoleEnum;
}

export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: userRoleEnum;
}

export enum userRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUserSearch {
  organizationId: string;
  skip?: number;
  limit?: number;
  role?: userRoleEnum;
}
