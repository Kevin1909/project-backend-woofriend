import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { FormAdoptionService } from './form-adoption.service';
import { CreateFormAdoptionDto } from './dto/create-form-adoption.dto';
import { UpdateFormAdoptionDto } from './dto/update-form-adoption.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateAnimalDto } from 'src/animals/dto/create-animal.dto';

@Controller('form-adoption')
export class FormAdoptionController {
  constructor(private readonly formAdoptionService: FormAdoptionService) {}

  @Post()
  @Auth(ValidRoles.user_petlover)
  create(
    @Body() createformAdoptionDto: CreateFormAdoptionDto, 
    @GetUser() user: User,
  ) {
    return this.formAdoptionService.create(createformAdoptionDto, user );
  }

  @Get(':term')
  @Auth()
  findOne(@Param( 'term' ) term: string) {
    return this.formAdoptionService.findOnePlain( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.user_petlover )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateformAdoptionDto: UpdateFormAdoptionDto,
    @GetUser() user: User,
  ) {
    return this.formAdoptionService.update( id, updateformAdoptionDto, user );
  }

  @Delete(':id')
  @Auth( ValidRoles.user_petlover )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.formAdoptionService.remove( id ); 
  }
}
