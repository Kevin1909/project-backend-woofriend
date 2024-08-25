import { Module } from '@nestjs/common';
import { FormAdoptionService } from './form-adoption.service';
import { FormAdoptionController } from './form-adoption.controller';
import { formAdoption } from './entities/form_adoption.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FormAdoptionController],
  providers: [FormAdoptionService],

  imports: [
    TypeOrmModule.forFeature([ formAdoption]),
    AuthModule
  ],

  exports:[
    TypeOrmModule
  ]
  
})
export class FormAdoptionModule {}
