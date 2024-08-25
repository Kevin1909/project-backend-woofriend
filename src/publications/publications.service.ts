import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';

import { Publication } from './entities/publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(

    @InjectRepository(Publication)
    private readonly publicacionRepository: Repository<Publication>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createPublicationDto: CreatePublicationDto, user: User) {
    
    try {

      
      const publication = this.publicacionRepository.create({
        ...createPublicationDto,
        user,
      });
      
      await this.publicacionRepository.save( publication );

      return publication;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }


  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    const publications = await this.publicacionRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      }
    })

    return publications
  }


  async findOne( term: string ) {

    let publication: Publication;

   
    

    if ( isUUID(term) ) {
      publication = await this.publicacionRepository.findOneBy({ 
        id: term,
        
      
      });
    } else {

      if ( !publication ) 
        throw new NotFoundException(`Publication with ${ term } not found`);
      
    }

  
    return publication;
  }


  async findOnePlain( term: string ) {
    const { user, ...rest } = await this.findOne( term );
    return {
      ...rest,
      user: user
    }
  }

  async update( id: string, updatePublicationDto: UpdatePublicationDto, user: User ) {



    const publication = await this.publicacionRepository.preload({ id, ...updatePublicationDto });

    if ( !publication ) throw new NotFoundException(`Publication with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // await this.productRepository.save( product );
      publication.user = user;
      
      await queryRunner.manager.save( publication );

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
    const publication = await this.findOne( id );
    await this.publicacionRepository.remove( publication );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.publicacionRepository.createQueryBuilder('animal');

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
