import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation } from './entities/donation.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([ Donation ]),
    AuthModule
  ]
})
export class DonationsModule {}
