import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schema/book.schema"
import { User } from "src/auth/schemas/user.schema"

export class updateBookDto {

    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category)
    readonly category: Category

    @IsOptional()
    @IsString()
    readonly author: string

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User
}