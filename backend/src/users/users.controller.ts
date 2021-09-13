import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { QueryParams } from './dto/query-params.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(@Query() params: QueryParams) {
        console.log('query', params);
        return this.userService.findAll(params);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() data: UserDto) {
        return this.userService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UserDto) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
