import { IsIn, IsOptional, IsString } from "class-validator";

export class CreatePublicationDto {

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    reason?: string;

    @IsString()
    @IsIn(["efecty", "material"])
    @IsOptional()
    typedonation?: string;

   

}
