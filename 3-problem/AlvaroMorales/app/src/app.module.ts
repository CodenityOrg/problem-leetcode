import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ActivitiesModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
