import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'
import { User } from 'src/auth/schemas/user.schema';
import { uploadImages } from 'src/utils/aws';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll (query: Query): Promise<Book[]> {
        
        const resPerPage = 10
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * ( currentPage - 1 )

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip)
        return books
    }

    async create(bookDetails: Book, userDetails: User): Promise<Book> {
        
        const data = Object.assign(bookDetails, { user: userDetails._id })

        const bookRes = await this.bookModel.create(data)
        return bookRes
    }

    async findById(bookId: string): Promise<Book> {

        const isVailId = mongoose.isValidObjectId(bookId)
        if(!isVailId) throw new BadRequestException('Please enter correct book id.')

        const bookDetails = await this.bookModel.findById(bookId)

        if(!bookDetails) throw new NotFoundException('Book not found')

        return bookDetails
    } 

    async updateBookById(bookId: String, bookDetails: Book): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(bookId)
        if (!isValidId) throw new BadRequestException('Please enter correct book id.')

        const updatedResponse = await this.bookModel.findByIdAndUpdate(bookId, bookDetails, {
            new: true,
            runValidators: true,
        })
        if (!updatedResponse) throw new NotFoundException('Book id not found')

        return updatedResponse
    }

    async deleteBookById(bookId: string): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(bookId)
        if (!isValidId) throw new BadRequestException(`Please enter correct book id.`)

        const deleteResponse = await this.bookModel.findByIdAndDelete(bookId)
        
        if (!deleteResponse) throw new NotFoundException('Book id not found')
            
        return deleteResponse
    }

    async uploadImages(bookId: string, files: Array<Express.Multer.File>) {
        const book = await this.bookModel.findById(bookId)

        if (!book) throw new NotFoundException('Book not found')

        const images = await uploadImages(files)

        book.images = images as object[]

        await book.save()

        return book

    }


}
