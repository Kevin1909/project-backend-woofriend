import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateAnimalDto {
   
   
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    typeanimal: string;

    @IsString()
    @MinLength(2)
    @MaxLength(15)
    name: string;

    @IsString()
    @MinLength(1)
    birthdate: string;

    @IsString()
    @MinLength(4)
    @MaxLength(25)
    race: string; 


    @IsString()
    @MinLength(10)
    @MaxLength(100)
    characteristics: string;

    @IsString()
    @IsOptional()
    vaccinationrecord?: string;


    @IsString()
    @IsOptional()
    pathologiesdisabilities?: string;
    
    @IsString()
    @IsOptional()
    photo?: string;







    
}
