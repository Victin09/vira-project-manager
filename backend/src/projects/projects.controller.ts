import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get('find/:id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Get('find-user/:userId')
    findByUser(@Param('userId') id: string) {
        return this.projectsService.findByUser(id);
    }

    @Post()
    create(@Body() data: CreateProjectDto) {
        return this.projectsService.create(data);
    }

    @Patch('add-user/:id/:user')
    addUser(@Param('id') id: string, @Param('user') user: string) {
        return this.projectsService.addUser(id, user);
    }

    @Patch('remove-user/:id/:user')
    removeUser(@Param('id') id: string, @Param('user') user: string) {
        return this.projectsService.removeUser(id, user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateProjectDto) {
        return this.projectsService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
