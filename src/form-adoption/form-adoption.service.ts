import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';



import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';

import { formAdoption } from './entities/form_adoption.entity';
import { CreateFormAdoptionDto } from './dto/create-form-adoption.dto';
import { UpdateFormAdoptionDto } from './dto/update-form-adoption.dto';
import { CreateAnimalDto } from 'src/animals/dto/create-animal.dto';

@Injectable()
export class FormAdoptionService {
  constructor(

    @InjectRepository(formAdoption)
    private readonly formRepository: Repository<formAdoption>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createformAdoptionDto: CreateFormAdoptionDto, user: User) {
    
    try {

      
      const formAdoption = this.formRepository.create({
        ...createformAdoptionDto,
        user,
      });
      
      await this.formRepository.save( formAdoption );

      return formAdoption;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }



  async findOne( term: string ) {

    let formAdoption: formAdoption;

    if ( isUUID(term) ) {
      formAdoption = await this.formRepository.findOneBy({ id: term });
    } else {
        throw new NotFoundException(`Form with ${ term } not found`);
    }

    return formAdoption;
  }


  async findOnePlain( term: string ) {
    const { user, ...rest } = await this.findOne( term );
    return {
      ...rest,
      user: user
    }
  }

  async update( id: string, updateformAdoptionDto: UpdateFormAdoptionDto, user: User ) {



    const formAdoption = await this.formRepository.preload({ id, ...updateformAdoptionDto });

    if ( !formAdoption ) throw new NotFoundException(`formAdoption with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // await this.productRepository.save( product );
      formAdoption.user = user;
      
      await queryRunner.manager.save( formAdoption );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const formAdoption = await this.findOne( id );
    await this.formRepository.remove( formAdoption );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.formRepository.createQueryBuilder('animal');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }
}
