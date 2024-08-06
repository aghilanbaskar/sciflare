export interface IUser {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  deleted: boolean;
  organizationId: string;
  role: string;
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
}
