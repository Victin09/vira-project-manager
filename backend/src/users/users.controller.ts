import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryParams } from './dto/query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() params: QueryParams): Promise<Array<User>> {
        return this.userService.findAll(params);
    }

    @Get('find/:id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get('find-mail/:email')
    @UseGuards(JwtAuthGuard)
    findByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: CreateUserDto): Promise<User> {
        return this.userService.create(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
