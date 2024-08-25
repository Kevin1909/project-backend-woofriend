import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Publication } from './entities/publication.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([ Publication ]),
    AuthModule
  ]
})
export class PublicationsModule {}
