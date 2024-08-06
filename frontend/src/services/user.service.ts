import { AxiosPromise } from "axios";
import { IUser, IUserCreate } from "../interfaces/User";
import axiosInstance from "./base.service";


class usersService {
    static request = axiosInstance

    static async create(data: IUserCreate) {
        const response = await usersService.request.post('/users', data)
        return response.data
    }

    static async get(id: string): AxiosPromise<IUser> {
        return await usersService.request.get(`/users/${id}`)
    }
}

export default usersService