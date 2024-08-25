import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';



import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';

import { User } from '../auth/entities/user.entity';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';


@Injectable()
export class DonationsService {
  constructor(

    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,

    private readonly dataSource: DataSource,

  ) {}



  async create(createDonationDto: CreateDonationDto, user: User) {
    
    try {

      
      const donation = this.donationRepository.create({
        ...createDonationDto,
        user,
      });
      
      await this.donationRepository.save( donation );

      return donation;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }




  async findOne( term: string ) {

    let donation: Donation;

    if ( isUUID(term) ) {
      donation = await this.donationRepository.findOneBy({ id: term });
    } else {
      throw new NotFoundException(`Donation with ${ term } not found`);
    }


    return donation;
  }


  async findOnePlain( term: string ) {
    const { user, ...rest } = await this.findOne( term );
    return {
      ...rest,
      user: user
    }
  }

  async update( id: string, updateDonationDto: UpdateDonationDto, user: User ) {



    const donation = await this.donationRepository.preload({ id, ...updateDonationDto });

    if ( !donation ) throw new NotFoundException(`donation with id: ${ id } not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // await this.productRepository.save( product );
      donation.user = user;
      
      await queryRunner.manager.save( donation );

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
    const donation = await this.findOne( id );
    await this.donationRepository.remove( donation );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllProducts() {
    const query = this.donationRepository.createQueryBuilder('animal');

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
