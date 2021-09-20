import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Project } from './entities/project.entity';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@ApiTags('projects')
@ApiBearerAuth('access-token')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({
        status: 200,
        description: 'Project list',
        type: Project,
    })
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Get('find/:projectCode')
    @ApiOperation({ summary: 'Find project by name' })
    @ApiResponse({
        status: 200,
        description: 'Find project',
        type: Project,
    })
    findOne(@Param('projectCode') projectCode: string): Promise<Project> {
        return this.projectsService.findOne(projectCode);
    }

    @Get('find-user/:userMail')
    @ApiOperation({ summary: 'Get all projects associated to user' })
    @ApiResponse({
        status: 200,
        description: 'Project list',
        type: Project,
    })
    findByUser(@Param('userMail') id: string): Promise<Project[]> {
        return this.projectsService.findByUser(id);
    }

    @Post('/:userMail')
    @ApiOperation({ summary: 'Create new projects' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Project,
    })
    create(@Param('userMail') mail: string, @Body() data: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(mail, data);
    }

    @Patch('add-user/:id/:user')
    @ApiOperation({ summary: 'Add user to project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Project,
    })
    addUser(@Param('id') id: string, @Param('user') user: string): Promise<Project> {
        return this.projectsService.addUser(id, user);
    }

    @Patch('remove-user/:id/:user')
    @ApiOperation({ summary: 'Remove user from project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Project,
    })
    removeUser(@Param('id') id: string, @Param('user') user: string): Promise<Project> {
        return this.projectsService.removeUser(id, user);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Project,
    })
    update(@Param('id') id: string, @Body() data: UpdateProjectDto): Promise<Project> {
        return this.projectsService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Project,
    })
    remove(@Param('id') id: string): Promise<void> {
        return this.projectsService.remove(id);
    }
}
