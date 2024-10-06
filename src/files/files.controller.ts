import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, BadRequestException, Res, Body, Delete,  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';
import { AnimalsService } from 'src/animals/animals.service';

//@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('animals/:imageName')
  findAnimalImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticAnimalImage( imageName );

    res.sendFile( path );
  }

  @Get('profiles/:imageName')
  findProfileImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProfileImage( imageName );

    res.sendFile( path );
  }

  @Get('publications/:imageName')
  findPublicationImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticPublicationImage( imageName );

    res.sendFile( path );
  }


  @Post('animal')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: { fileSize: 1000 },
    storage: diskStorage({
      destination: './static/animals',
      filename: fileNamer
    })
  }) )
  uploadAnimalImage( 
    @UploadedFile() file: Express.Multer.File, 

    
  ){
    
    if ( !file ) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    // const secureUrl = `${ file.filename }`;
    const image = `${ this.configService.get('HOST_API') }/files/animals/${ file.filename}`;

    return { secureUrl: image };
  }

  @Post('profile')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/profiles',
      filename: fileNamer
    })
  }) )
  uploadProfileImage( 
    @UploadedFile() file: Express.Multer.File,
  ){

    if ( !file ) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    // const secureUrl = `${ file.filename }`;
    const image = `${ this.configService.get('HOST_API') }/files/profiles/${ file.filename}`;

    return { secureUrl: image };
  }

  @Delete('animals/:imageName')
  deleteAnimalImage(
    @Param('imageName') imageName: string
  ) {

    this.filesService.deleteStaticAnimalImage( imageName );
    return true
  }



}
