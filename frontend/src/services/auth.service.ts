import axios, { AxiosPromise } from "axios";
import { baseURL } from "./base.service";
import { ILogin, ILoginSuccess, ISignup } from "../interfaces/Auth";
import { IUser } from "../interfaces/User";

class AuthService {
    static request = axios.create({
        baseURL: baseURL, // Replace with your API base URL
        headers: {
            'Content-Type': 'application/json',
        },
    });
    static login(loginDto: ILogin):AxiosPromise<IUser[] | ILoginSuccess> {
        return AuthService.request.post('/auth/login', loginDto);
    }

    static signup(signupDto: ISignup) {
        return AuthService.request.post('/auth/signup', signupDto);
    }
}

export default AuthService