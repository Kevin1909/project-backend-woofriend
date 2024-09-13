import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Options, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Like, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { profile } from 'console';




@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}


  async create( createUserDto: CreateUserDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;


    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        profile: true
      }

    });
    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };

  }


  
  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }


  async findByFilter( term: string) {

    const user = await this.userRepository.find({
      where:{
        name: ILike(`%${term}%`),
      },
      relations: {
        profile: true
      }
      
    })

    return user
    
  }


  async findProfile( id: string ) {

    try {
      const userProfile = await this.userRepository.findOne({
        where: {
          id: id
        },
        relations: {
          profile: true
          
        },
        
      })

      const profile = userProfile.profile
      return profile


    } catch (error) {
      throw new NotFoundException(`Profile with ${ id } not found`);
    
    }
  }

  async updateUser (id: string,  updateUserDto: UpdateUserDto){

    let passwordCrypt = '';
    const { password, ...Data } = updateUserDto;

    if (password) { 
      passwordCrypt = bcrypt.hashSync( password, 10 ) 
    }

    const userData = {
      ...Data,
      passwordCrypt
    }

    const user = await this.userRepository.preload({ id, ...userData});

    if ( !user ) throw new NotFoundException(`User with id: ${ id } not found`);


  
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      await queryRunner.manager.save( user );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }


  async deleteUser (id: string) {

    const user = await this.userRepository.findOneBy({id});
    await this.userRepository.remove(  user, );
  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }


}
