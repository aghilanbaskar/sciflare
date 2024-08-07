import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import UserSession from 'src/models/userSession.model';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-token') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext,) {
    if (err || info || !user) {
      return err || info || new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest();
    request.user = user;
    const refreshToken = request.headers.authorization?.split(' ')?.[1];

    return UserSession.findOne({
      userId: user.userId,
      refreshToken: refreshToken,
    })
      .lean()
      .then((session) => {
        if (!session) {
          throw new UnauthorizedException();
        }
        return user;
      });
  }
}
