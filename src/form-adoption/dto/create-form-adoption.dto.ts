import { IsIn, IsObject, IsString, MaxLength, MinLength, } from "class-validator";
import { CreateAnimalDto } from "src/animals/dto/create-animal.dto";

export class CreateFormAdoptionDto {

    @IsString()
    @MinLength(5)
    @MaxLength(15)
    identification: string;

    
    @IsString()
    birthdate: string;

    @IsString()
    @MinLength(10)
    reasonadoption: string;

    @IsString()
    interviewdate: string;

    @IsObject()
    animal: CreateAnimalDto;

}
