import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { User } from 'src/auth/entities';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  
  @Post()
  @Auth(ValidRoles.user_foundation)
  create(
    @Body() createProductDto: CreateAnimalDto,
    @GetUser() user: User,
  ) {
    return this.animalsService.create(createProductDto, user );
  }

  @Get()
  @Auth()
  findAll( @Query() paginationDto:PaginationDto ) {
    // console.log(paginationDto)
    return this.animalsService.findAll( paginationDto );
  }

  @Get('/forms/:id')
  @Auth(ValidRoles.user_foundation)
  findAnimalForms( @Param('id') id : string) {
    // console.log(paginationDto)
    return this.animalsService.findAnimalsForms( id );
  }

  @Get('/filter/:term')
  @Auth()
  findOneFilter(@Param( 'term' ) term: string) {
    return this.animalsService.findByFilter( term );
  }

  @Get(':term')
  @Auth()
  findBy(@Param( 'term' ) term: string) {
    return this.animalsService.findOnePlain( term );
  }


  @Patch(':id')
  @Auth( ValidRoles.user_foundation )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateAnimalDto,
    @GetUser() user: User,
  ) {
    return this.animalsService.update( id, updateProductDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.user_foundation )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.animalsService.remove( id );
}
}
