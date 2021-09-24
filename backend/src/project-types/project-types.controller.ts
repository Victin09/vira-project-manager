import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectTypesService } from './project-types.service';
import { CreateProjectTypeDto } from './dto/create-project-type.dto';
import { UpdateProjectTypeDto } from './dto/update-project-type.dto';
import { ProjectType } from './entities/project-type.entity';

@Controller('project-types')
@UseGuards(JwtAuthGuard)
@ApiTags('project-types')
@ApiBearerAuth('access-token')
export class ProjectTypesController {
    constructor(private readonly projectTypesService: ProjectTypesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({
        status: 200,
        description: 'Project list',
        type: ProjectType,
    })
    findAll() {
        return this.projectTypesService.findAll();
    }

    @Get('find-id/:id')
    @ApiOperation({ summary: 'Find project type by id' })
    @ApiResponse({
        status: 200,
        description: 'Project type',
        type: ProjectType,
    })
    findOne(@Param('id') id: string) {
        return this.projectTypesService.findOne(id);
    }

    @Get('find-name/:name')
    @ApiOperation({ summary: 'Find project type by name' })
    @ApiResponse({
        status: 200,
        description: 'Project type',
        type: ProjectType,
    })
    findByName(@Param('name') name: string) {
        return this.projectTypesService.findByName(name);
    }

    @Post()
    @ApiOperation({ summary: 'Create new project type' })
    @ApiResponse({
        status: 200,
        description: 'Project type',
        type: ProjectType,
    })
    create(@Body() createProjectTypeDto: CreateProjectTypeDto) {
        return this.projectTypesService.create(createProjectTypeDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update project type' })
    @ApiResponse({
        status: 200,
        description: 'Project type',
        type: ProjectType,
    })
    update(@Param('id') id: string, @Body() updateProjectTypeDto: UpdateProjectTypeDto) {
        return this.projectTypesService.update(id, updateProjectTypeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete project type' })
    @ApiResponse({
        status: 200,
        description: 'Project type',
        type: ProjectType,
    })
    remove(@Param('id') id: string) {
        return this.projectTypesService.remove(id);
    }
}
