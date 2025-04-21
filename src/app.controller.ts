import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { postTest } from './dto/postTest.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('new')
  // helloWorld() {
  //   return this.appService.getHelloWorld()
  // }

  // @Get('new/book')
  // getBooks() {
  //   return 'Book are loading..'
  // }

  // @Get(':id')
  // paramsExample( @Param('id') id: string ) {
  //   return `Your ID is: ${id}`
  // }

  // @Post('postTest')
  // postRequestHandle(
  //   @Body()
  //   bodyData: postTest,
  // ) {
  //   console.log(bodyData)
  //   return bodyData
  // }

}
