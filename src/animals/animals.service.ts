import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, IsNull, Not, Repository } from 'typeorm';

import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';
import { Animal } from './entities/animal.entity';
import { IsNotEmpty } from 'class-validator';


@Injectable()
export class AnimalsService {

  

  constructor(

    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createAnimalDto: CreateAnimalDto, user: User) {
    
    try {

      
      const animal = this.animalRepository.create({
        ...createAnimalDto,
        user,
      });
      
      await this.animalRepository.save( animal );

      return animal;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }


  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    const animals = await this.animalRepository.find({
      take:limit,
      skip: offset,
      relations: {
        user: true,
      }
    })

    return animals
  }

  async findAnimalsForms( id: string) {

    
    const animal = await this.animalRepository.findOne({
      where: 
        {
          id: id
        },
        relations: {
          form: true
        }

      })
      
      const form = animal.form
      return {
        form
      }
    
    
  }



  async findByFilter( term: string) {

    const animals = await this.animalRepository.find({
      where: [
        {
          typeanimal: ILike(`%${term}%`),
        },
        {
          race: ILike(`%${term}%`),
        }
      ]
      ,

      relations: {
        user: true
      },

      
      
    })

    return animals
      
  
  }

  async findOne( term: string ) {

    let animal: Animal;

    if ( isUUID(term) ) {
      animal = await this.animalRepository.findOneBy({ id: term });
    } else {
      if ( !animal ) 
        throw new NotFoundException(`Animal with ${ term } not found`);
      
        
    }

    return animal;
  }


  async findOnePlain( term: string ) {
    const { user, ...rest } = await this.findOne( term );
    return {
      ...rest,
      user: user
    }
  }

  async update( id: string, updateAnimalDto: UpdateAnimalDto, user: User ) {



    const animal = await this.animalRepository.preload({ id, ...updateAnimalDto });

    if ( !animal ) throw new NotFoundException(`Animal with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // await this.productRepository.save( product );
      animal.user = user;
      
      await queryRunner.manager.save( animal );

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
    const animal = await this.findOne( id );
    await this.animalRepository.remove( animal );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.animalRepository.createQueryBuilder('animal');

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
