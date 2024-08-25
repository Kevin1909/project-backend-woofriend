import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    @IsOptional()
    firstcontent?: string;

    @IsString()
    @IsOptional()
    secondcontent?: string;

    @IsString()
    @IsOptional()
    thirdcontent?: string;

    @IsString()
    @IsOptional()
    photo?: string;

   

}
