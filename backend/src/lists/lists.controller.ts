import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('lists')
export class ListsController {
    constructor(private readonly listService: ListsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.listService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.listService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: CreateListDto) {
        return this.listService.create(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() data: UpdateListDto) {
        return this.listService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.listService.remove(id);
    }
}
