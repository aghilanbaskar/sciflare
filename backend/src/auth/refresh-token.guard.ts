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

  handleRequest(err, user, info) {
    if (err || info || !user) {
      return err || info || new UnauthorizedException();
    }

    return UserSession.findOne({
      userId: user._id,
      refreshToken: info.refreshToken,
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
