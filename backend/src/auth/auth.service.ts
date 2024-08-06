import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import Organization from 'src/models/organization.model';
import User, { IUserDocument, userRoleEnum } from 'src/models/users.model';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import UserSession from 'src/models/userSession.model';
import { IJwtPayload } from './jwt.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
      return {
        user: userData,
        organization: organizationData,
      };
    } catch (error) {
      await session.abortTransaction();
      if (error && error.code === 11000) {
        throw new BadRequestException('Company name already taken!');
      }
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
            company?._id?.toString() === user?.organizationId?.toString(),
        )?.name,
      };
    });
  }
  singleUserLogin(user: IUserDocument) {
    return this.createUserSession(user);
  }

  async createUserSession(user: IUserDocument) {
    const jwtPayload: IJwtPayload = {
      email: user.email,
      organizationId: user.organizationId.toString(),
      userId: user._id.toString(),
      sub: user._id.toString(),
      role: user.role,
    };
    const userSession = new UserSession({
      userId: user._id,
      organizationId: user.organizationId,
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    });
    const userSessionData = await userSession.save();
    return userSessionData;
  }

  async refreshToken(refreshToken: string) {
    const payload: IJwtPayload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    if (!payload) {
      throw new Error('Invalid refresh token');
    }
    const jwtPayload: IJwtPayload = {
      email: payload.email,
      organizationId: payload.organizationId,
      userId: payload.userId,
      sub: payload.sub,
      role: payload.role,
    };
    return {
      access_token: this.jwtService.sign({
        jwtPayload,
      }),
    };
  }
}
