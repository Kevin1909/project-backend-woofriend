import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class FilesService {
  
    getStaticAnimalImage( imageName: string ) {

        const path = join( __dirname, '../../static/animals', imageName );

        if ( !existsSync(path) ) 
            throw new BadRequestException(`No animal found with image ${ imageName }`);

        return path;
    }

    getStaticProfileImage( imageName: string ) {

        const path = join( __dirname, '../../static/profiles', imageName );

        if ( !existsSync(path) ) 
            throw new BadRequestException(`No photo found with image ${ imageName }`);

        return path;
    }

    getStaticPublicationImage( imageName: string ) {

        const path = join( __dirname, '../../static/publications', imageName );

        if ( !existsSync(path) ) 
            throw new BadRequestException(`No publication found with image ${ imageName }`);

        return path;
    }


}
