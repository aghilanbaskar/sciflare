import { IUser } from '../../interfaces/User';

export interface IAuthState {
  success: boolean;
  user: IUser | null;
  error: string[];
  loading: boolean;
  accessToken: string;
  refreshToken: string;
  organizationId: string;
  userId: string;
  resetEmailSent: boolean;
  multipleUserFlow: boolean;
  multipleUsers: IUser[];
}

export interface IAuthAction {
  type: string;
  payload: IAuthState;
}

// auth.types.ts
const authTypes = {
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  RESET_PASSWORD_EMAIL_SUCCESS: 'RESET_PASSWORD_EMAIL_SUCCESS',
  SIGNIN_MULTIPLE_USER: 'SIGNIN_MULTIPLE_USER',
  INITIALIZE_AUTH: 'INITIALIZE_AUTH',
  SIGNOUT: 'SIGNOUT',
  SIGNUP: 'SIGNUP',
};

export default authTypes;
