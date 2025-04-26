import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
    
    constructor(
        private readonly bookService: BookService
    ) {}

    @Get()
    @Roles(Role.Admin, Role.Manager)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllBooks(
        @Query()
        query: ExpressQuery
    ): Promise<Book[]> {
        return this.bookService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        bookDetails: createBookDto,
        @Req()
        req: { user: User }
    ): Promise<Book> {
        return this.bookService.create(bookDetails, req?.user)
    }

    @Get(':bookId')
    async getBookById(
        @Param('bookId')
        bookId: string
    ): Promise<Book> {
        return this.bookService.findById(bookId)
    }

    @Put(':bookId')
    async updateBookById(
        @Param('bookId')
        bookId: string,
        @Body()
        bookDetails: updateBookDto 
    ): Promise<Book> {
        return this.bookService.updateBookById(bookId, bookDetails)
    }

    @Delete(':bookId')
    async deleteBookById(
        @Param('bookId')
        bookId: string
    ): Promise<Book> {
        return this.bookService.deleteBookById(bookId)
    }

    @Put('upload/:bookId')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(
        @Param('bookId') bookId: string,
        @UploadedFiles(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: /(jpg|jpeg|png)$/
            })
            .addMaxSizeValidator({
                maxSize: 1000 * 1000,
                message: 'File size must be less than 1MB'
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            })
        ) files: Array<Express.Multer.File>
    ) {
        return  this.bookService.uploadImages(bookId, files)
    }



}
