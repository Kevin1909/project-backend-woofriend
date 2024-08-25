import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { ProfileService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @Auth(ValidRoles.user_foundation, ValidRoles.user_petlover)
  create(
    @Body() createProfileDto: CreateProfileDto,
    @GetUser() user: User,
  ) {
    return this.profileService.create(createProfileDto, user );
  }

  
  @Get(':term')
  @Auth()
  findOne(@Param( 'term' ) term: string) {
    return this.profileService.findOnePlain( term );
  }

  @Patch(':id')
  @Auth( ValidRoles.user_foundation, ValidRoles.user_petlover )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUser() user: User,
  ) {
    return this.profileService.update( id, updateProfileDto, user );
  }
}
