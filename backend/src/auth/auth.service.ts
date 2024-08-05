import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import Organization from 'src/models/organization.model';
import User, { userRoleEnum } from 'src/models/users.model';

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
}
