import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Animal } from './entities/animal.entity';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
  imports: [
    TypeOrmModule.forFeature([ Animal ]),
    AuthModule,
  ],

  exports: [
    TypeOrmModule,
  ]
})
export class AnimalsModule {}
