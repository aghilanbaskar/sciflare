import { AxiosPromise } from 'axios';
import axiosInstance from './base.service';
import { IOrganization, IOrganizationUpdate } from '../interfaces/Organization';

class usersService {
  static request = axiosInstance;

  static async get(id: string): AxiosPromise<IOrganization> {
    return await usersService.request.get(`/organization/${id}`);
  }

  static async update(
    id: string,
    data: IOrganizationUpdate
  ): AxiosPromise<IOrganization> {
    return await usersService.request.patch(`/organization/${id}`, data);
  }
}

export default usersService;
