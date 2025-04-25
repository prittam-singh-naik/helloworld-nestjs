import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string

    @IsNotEmpty()
    readonly role: string[]
}