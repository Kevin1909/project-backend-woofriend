import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { userInfo } from 'os';

@Injectable()
export class ProfileService {
  constructor(

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createProfileDto: CreateProfileDto, user: User) {
    
    try {

      
      const profile = this.profileRepository.create({
        ...createProfileDto,
        user,
      });
      
      await this.profileRepository.save( profile );

      return profile;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }



  async findOne( term: string ) {

    let profile: Profile;

  
    if ( isUUID(term) ) {
      profile = await this.profileRepository.findOne({ 
        where: {
         id: term
        },
        relations: {
          user: true,
        }
         
        
      
      });
    } else {

      if ( !profile ) 
        throw new NotFoundException(`Profile with ${ term } not found`);
      
    }

  
    return profile ;
  }


  async findOnePlain( term: string ) {
    const findprofile = await this.findOne( term );
    return findprofile;
  }


  async update( id: string, updateProfileDto: UpdateProfileDto , user: User ) {



    const profile = await this.profileRepository.preload({ id, ...updateProfileDto });

    if ( !profile ) throw new NotFoundException(`Profile with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // await this.productRepository.save( product );
      profile.user = user;
      
      await queryRunner.manager.save( profile );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }



  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.profileRepository.createQueryBuilder('animal');

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
