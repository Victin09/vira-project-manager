import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryParams } from './dto/query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('access-token')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'User list',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Find user by id' })
    @ApiResponse({
        status: 200,
        description: 'User',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get('find-mail/:email')
    @ApiOperation({ summary: 'Find user by email' })
    @ApiResponse({
        status: 200,
        description: 'User',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    findByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @Post()
    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({
        status: 200,
        description: 'User',
        type: User,
    })
    create(@Body() data: CreateUserDto): Promise<User> {
        return this.userService.create(data);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({
        status: 200,
        description: 'User',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove user' })
    @ApiResponse({
        status: 200,
        description: 'User',
        type: User,
    })
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
