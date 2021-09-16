import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { List } from './entities/list.entity';

@Controller('lists')
@UseGuards(JwtAuthGuard)
@ApiTags('lists')
@ApiBearerAuth('access-token')
export class ListsController {
    constructor(private readonly listService: ListsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all lists' })
    @ApiResponse({
        status: 200,
        description: 'List list',
        type: List,
    })
    findAll(): Promise<List[]> {
        return this.listService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find list by id' })
    @ApiResponse({
        status: 200,
        description: 'List',
        type: List,
    })
    findOne(@Param('id') id: string): Promise<List> {
        return this.listService.findOne(id);
    }

    @Get('project/:id')
    @ApiOperation({ summary: 'Find lists by project id' })
    @ApiResponse({
        status: 200,
        description: 'List list',
        type: List,
    })
    findByProject(@Param('id') id: string): Promise<List[]> {
        return this.listService.findByProject(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new list' })
    @ApiResponse({
        status: 200,
        description: 'List',
        type: List,
    })
    create(@Body() data: CreateListDto): Promise<List> {
        return this.listService.create(data);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update list' })
    @ApiResponse({
        status: 200,
        description: 'List',
        type: List,
    })
    update(@Param('id') id: string, @Body() data: UpdateListDto): Promise<List> {
        return this.listService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove list' })
    @ApiResponse({
        status: 200,
        description: 'List',
        type: List,
    })
    remove(@Param('id') id: string): Promise<void> {
        return this.listService.remove(id);
    }
}
