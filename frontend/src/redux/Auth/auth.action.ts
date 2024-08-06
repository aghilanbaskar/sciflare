import { Dispatch } from 'redux';
import authType, { IAuthState } from './auth.types';
import AuthService from '../../services/auth.service';
import { ILogin } from '../../interfaces/Auth';
import usersService from '../../services/user.service';

// Update the return type of signInUserWithEmailAndPassword to return the action object
export const signInUserWithEmailAndPassword =
  ({ email, password, organizationId }: ILogin) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: authType.SIGNIN_SUCCESS,
        payload: {
          loading: true,
        },
      });
      const postData: ILogin = {
        email,
        password,
      };
      if (organizationId) {
        postData.organizationId = organizationId;
      }
      const response = await AuthService.login(postData);
      const data = response.data;
      if (Array.isArray(data)) {
        const payload = {
          success: false,
          user: null,
          error: [],
          loading: false,
          resetEmailSent: false,
          multipleUserFlow: true,
          multipleUsers: data,
        };
        dispatch({ type: authType.SIGNIN_MULTIPLE_USER, payload });
        return payload;
      } else {
        const payload: IAuthState = {
          success: true,
          user: null,
          error: [],
          loading: false,
          resetEmailSent: false,
          multipleUserFlow: false,
          multipleUsers: [],
          organizationId: data.organizationId,
          userId: data.userId,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispatch({ type: authType.SIGNIN_SUCCESS, payload });
        return payload;
      }
    } catch (error) {
      const payload = {
        success: false,
        user: null,
        error: ['Error while signing in. Please try again'],
        loading: false,
      };
      dispatch({ type: authType.SIGNIN_SUCCESS, payload });
      return payload;
    }
  };

export const initializeAuth =
  (userId?: string) => async (dispatch: Dispatch) => {
    const localStorageData = localStorage.getItem('auth');
    let payload: IAuthState = {
      userId: userId || '',
      user: null,
    };
    if (localStorageData) {
      payload = JSON.parse(localStorageData);
    }
    if (payload.userId) {
      dispatch({ type: authType.INITIALIZE_AUTH, payload });
      const userResponse = await usersService.get(payload.userId);
      if (userResponse.data) {
        payload.user = userResponse.data;
      }
      dispatch({ type: authType.INITIALIZE_AUTH, payload });
      return payload;
    }
  };
