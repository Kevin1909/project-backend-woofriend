import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { GetUser,Auth } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}
  
  @Post()
  @Auth(ValidRoles.user_petlover)
  create(
    @Body() createDonationDto: CreateDonationDto,
    @GetUser() user: User,
  ) {
    return this.donationsService.create(createDonationDto, user );
  }


  @Get(':term')
  @Auth()
  findOne(@Param( 'term' ) term: string) {
    return this.donationsService.findOnePlain( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.user_petlover )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateDonationDto: UpdateDonationDto,
    @GetUser() user: User,
  ) {
    return this.donationsService.update( id, updateDonationDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.user_petlover )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.donationsService.remove( id );
}
}
