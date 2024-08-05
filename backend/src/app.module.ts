import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, OrganizationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
