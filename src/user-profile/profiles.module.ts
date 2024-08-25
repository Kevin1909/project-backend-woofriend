import { Module } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfileService],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([ Profile ]),
    AuthModule
  ],
  
})
export class ProfilesModule {}
