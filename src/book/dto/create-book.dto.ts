import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/book.schema";
import { User } from "src/auth/schemas/user.schema";

export class createBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly author: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category.' })
    readonly category: Category

    @IsEmpty({ message: "You cannot pass user id." })
    readonly user: User
}