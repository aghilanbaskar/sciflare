export interface IOrganization {
  name: string;
  email: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  nameLowerCase: string;
  id: string;
}

export interface IOrganizationUpdate {
  companyName: string;
}
