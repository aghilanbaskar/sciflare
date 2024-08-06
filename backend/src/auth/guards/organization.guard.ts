import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import User, { userRoleEnum } from 'src/models/users.model';

@Injectable()
export class canAccessOrganization implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const organizationId =
      request.params.organizationId ||
      request.body.organizationId ||
      request.query.organizationId ||
      request.headers.organizationid;
    if (!organizationId) {
      return false;
    }
    return (user.organizationId = organizationId);
  }
}

@Injectable()
export class canAccessUser implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId =
      request.params.userId ||
      request.body.userId ||
      request.query.userId ||
      request.headers.userid;
    if (!userId) {
      return false;
    }
    if (user.id === userId) {
      // same user
      return true;
    }
    const whatUser = await User.findById(user.userId); // current User
    const whoUser = await User.findById(userId); // verifying user

    if (!whatUser || whatUser.deleted) {
      return false;
    }
    if (!whoUser || whoUser.deleted) {
      return false;
    }
    if (whoUser.isOwner && !whatUser.isOwner) {
      throw new ForbiddenException('Access Denied - EU-0'); // owner
    }

    if (whatUser.role === userRoleEnum.USER) {
      throw new ForbiddenException('Access Denied - EU-1'); // user role can'rt access others
    }

    if (
      whatUser.organizationId.toString() !== whoUser.organizationId.toString()
    ) {
      throw new ForbiddenException('Access Denied - EU-2'); //different org
    }
    return true;
  }
}
