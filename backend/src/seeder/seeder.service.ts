import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import Organization from 'src/models/organization.model';
import User, { userRoleEnum } from 'src/models/users.model';

@Injectable()
export class SeederService {
  async seed() {
    for (let i = 0; i < 5; i++) {
      const orgData = {
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      };
      const organization = new Organization(orgData);
      const organizationData = await organization.save();
      for (let j = 0; j < 10; j++) {
        const userData = {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone: faker.phone.number(),
          avatar: faker.image.avatar(),
          organizationId: organizationData._id,
          role: faker.helpers.arrayElement([
            userRoleEnum.USER,
            userRoleEnum.ADMIN,
          ]),
          isOwner: false,
        };
        if (j === 0) {
          userData.isOwner = true;
          userData.role = userRoleEnum.ADMIN;
          userData.email = organizationData.email;
        }
        const user = new User(userData);

        await user.save();
      }
    }
  }
}
