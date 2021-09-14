import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryParams } from './dto/query-params.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() params: QueryParams) {
        return this.userService.findAll(params);
    }

    @Get('find/:id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get('find-mail/:email')
    @UseGuards(JwtAuthGuard)
    findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: UserDto) {
        return this.userService.create(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() data: UserDto) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
