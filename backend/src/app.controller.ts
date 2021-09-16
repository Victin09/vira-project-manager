import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: 'App controller' })
    @ApiResponse({
        status: 200,
        description: 'String',
        type: String,
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
