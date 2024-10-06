import { Controller, Get, Post, Body,  Patch, ParseUUIDPipe, Param, Delete } from '@nestjs/common';


import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';


import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

  @Get('/filter/:term')
  findOneFilter(@Param( 'term' ) term: string) {
    return this.authService.findByFilter( term );
  }


  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() CreateUserDto: CreateUserDto,
  ){
    return this.authService.updateUser( id, CreateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.authService.deleteUser( id );
  }


}
