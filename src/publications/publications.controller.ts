import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Post()
  @Auth(ValidRoles.user_foundation)
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @GetUser() user: User,
  ) {
    return this.publicationService.create(createPublicationDto, user );
  }


  @Get()
  @Auth()
  findAll( @Query() paginationDto:PaginationDto ) {
    // console.log(paginationDto)
    return this.publicationService.findAll( paginationDto );
  }
  
  @Get(':term')
  @Auth()
  findOne(@Param( 'term' ) term: string) {
    return this.publicationService.findOnePlain( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.user_foundation )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updatePublicationDto: UpdatePublicationDto,
    @GetUser() user: User,
  ) {
    return this.publicationService.update( id, updatePublicationDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.user_foundation )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.publicationService.remove( id ); 
  }
}
