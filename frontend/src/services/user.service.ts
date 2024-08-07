import { AxiosPromise } from 'axios';
import {
  IUser,
  IUserCreate,
  IUserSearch,
  IUserUpdate,
} from '../interfaces/User';
import axiosInstance from './base.service';

class usersService {
  static request = axiosInstance;

  static async create(data: IUserCreate) {
    const response = await usersService.request.post('/users', data);
    return response.data;
  }

  static async get(id: string): AxiosPromise<IUser> {
    return await usersService.request.get(`/users/${id}`);
  }

  static async update(id: string, data: IUserUpdate) {
    const response = await usersService.request.patch(`/users/${id}`, data);
    return response.data;
  }

  static async search(query: IUserSearch): AxiosPromise<{
    users: IUser[];
    count: number;
  }> {
    const response = await usersService.request.get(`/users/`, {
      params: query,
    });
    return response;
  }

  static async delete(id: string) {
    const response = await usersService.request.delete(`/users/${id}`);
    return response.data;
  }
}

export default usersService;
