import authTypes, { IAuthAction, IAuthState } from './auth.types';

const INITIAL_STATE: IAuthState = {
  success: false,
  error: [],
  loading: false,
  user: null,
  resetEmailSent: false,
  multipleUserFlow: false,
  multipleUsers: [],
  organizationId: '',
  userId: '',
  accessToken: '',
  refreshToken: '',
};

const authReducer = (
  state: IAuthState = INITIAL_STATE,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case authTypes.INITIALIZE_AUTH: {
      const payload = {
        ...state,
        ...action.payload,
      };
      localStorage.setItem('auth', JSON.stringify(payload));
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      return payload;
    }
    case authTypes.SIGNIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case authTypes.RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        resetEmailSent: true,
      };
    case authTypes.SIGNIN_MULTIPLE_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
