import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';
import { PublicationsModule } from './publications/publications.module';
import { DonationsModule } from './donations/donations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormAdoptionModule } from './form-adoption/form-adoption.module';
import { FilesModule } from './files/files.module';
import { ProfilesModule } from './user-profile/profiles.module';




@Module({
  imports: [
    
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),

    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),*/
    
    AuthModule, 
    AnimalsModule, 
    PublicationsModule, 
    DonationsModule, FormAdoptionModule, ProfilesModule,
    FilesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
