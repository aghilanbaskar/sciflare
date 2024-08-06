export interface IJwtPayload {
  email: string;
  organizationId: string;
  userId: string;
  sub: string;
  role?: string;
}
