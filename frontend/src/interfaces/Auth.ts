export interface ILogin {
  email: string;
  password: string;
  organizationId?: string;
}

export interface ISignup {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginSuccess {
  userId: string;
  organizationId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
