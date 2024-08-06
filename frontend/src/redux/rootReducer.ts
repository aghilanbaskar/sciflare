import { combineReducers } from 'redux';
import { IAuthState } from './Auth/auth.types';
import authReducer from './Auth/auth.reducer';

const rootReducer = combineReducers<{
    auth: IAuthState
}>({
    auth: authReducer,
});

export default rootReducer;