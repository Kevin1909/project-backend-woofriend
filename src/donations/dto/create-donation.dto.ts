import { IsIn, IsString } from "class-validator";

export class CreateDonationDto {

    @IsString()
    date: string;

    @IsIn(['efecty', 'material'])
    @IsString()
    typedonation: string;

   

}
