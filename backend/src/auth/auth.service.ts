import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import Organization from 'src/models/organization.model';
import User, { IUserDocument, userRoleEnum } from 'src/models/users.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async signup(signupDto: SignUpDto) {
    const session = await User.startSession();
    session.startTransaction();
    try {
      const organization = new Organization({
        name: signupDto.companyName,
        email: signupDto.email,
        phone: signupDto.phone,
        deleted: false,
      });
      const organizationData = await organization.save({ session });

      const user = new User({
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        email: signupDto.email,
        password: signupDto.password,
        organizationId: organizationData._id,
        role: userRoleEnum.ADMIN,
        isOwner: true,
        deleted: false,
      });
      const userData = await user.save({ session });
      await session.commitTransaction();
      console.log(
        'password',
        userData.password,
        await userData.isValidPassword(signupDto.password),
      );
      return {
        user: userData,
        organization: organizationData,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async login(loginDto: LoginDto) {
    const usersByEmail = await User.findByEmail(
      loginDto.email,
      loginDto.organizationId,
    );
    const users: IUserDocument[] = [];
    for (const user of usersByEmail) {
      if (await user.isValidPassword(loginDto.password)) {
        users.push(user);
      }
    }
    if (!users?.length) {
      throw new UnauthorizedException(
        'Invalid email or password. Please try again.',
      );
    }
    if (users.length === 1) {
      return this.singleUserLogin(users[0]);
    }
    const userCompanyIds = users.reduce((acc, user) => {
      acc.push(user.organizationId.toString());
      return acc;
    }, []);

    const userCompanies = await Organization.find({
      _id: { $in: userCompanyIds },
    });

    return users.map((user) => {
      return {
        ...user.toJSON(),
        companyName: userCompanies.find(
          (company) =>
            company._id.toString() === user.organizationId.toString(),
        ).name,
      };
    });
  }
  singleUserLogin(user: IUserDocument) {
    return user.toJSON();
  }
}
