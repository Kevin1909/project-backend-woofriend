import { IsArray, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(8)
    name: string;

    @IsString()
    @MinLength(8)
    ubication: string;

    @IsString()
    @MinLength(10)
    phone: string;

    @IsArray()
    roles: string [];

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