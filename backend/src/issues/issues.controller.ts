import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Issue } from './entities/issue.entity';

@Controller('issues')
@UseGuards(JwtAuthGuard)
@ApiTags('issues')
@ApiBearerAuth('access-token')
export class IssuesController {
    constructor(private readonly issueService: IssuesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all issues' })
    @ApiResponse({
        status: 200,
        description: 'Issue list',
        type: Issue,
    })
    findAll(): Promise<Issue[]> {
        return this.issueService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find issue by id' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    findOne(@Param('id') id: string): Promise<Issue> {
        return this.issueService.findOne(id);
    }

    @Get('list/:id')
    @ApiOperation({ summary: 'Find issues by list id' })
    @ApiResponse({
        status: 200,
        description: 'Issue list',
        type: Issue,
    })
    findByList(@Param('id') id: string): Promise<Issue[]> {
        return this.issueService.findByList(id);
    }

    @Get('project/:projectCode')
    @ApiOperation({ summary: 'Find issues by project code' })
    @ApiResponse({
        status: 200,
        description: 'Issue list',
        type: Issue,
    })
    findByProject(@Param('projectCode') projectCode: string): Promise<Issue[]> {
        return this.issueService.findByProject(projectCode);
    }

    @Get('user/:id')
    @ApiOperation({ summary: 'Find issues by user id' })
    @ApiResponse({
        status: 200,
        description: 'Issue list',
        type: Issue,
    })
    findByuser(@Param('id') id: string): Promise<Issue[]> {
        return this.issueService.findByUser(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new issue' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    create(@Body() data: CreateIssueDto): Promise<Issue> {
        return this.issueService.create(data);
    }

    @Patch('update/:id')
    @ApiOperation({ summary: 'Update issue' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    update(@Param('id') id: string, @Body() data: UpdateIssueDto): Promise<Issue> {
        return this.issueService.update(id, data);
    }

    @Patch('order')
    @ApiOperation({ summary: 'Update issues order' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    updateOrder(@Body() data: UpdateIssueDto[]): Promise<boolean> {
        return this.issueService.updateOrder(data);
    }

    @Patch('add-user/:code/:user')
    @ApiOperation({ summary: 'Add user to project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Issue,
    })
    addUser(@Param('code') id: string, @Param('user') user: string): Promise<Issue> {
        return this.issueService.addUser(id, user);
    }

    @Patch('remove-user/:code/:user')
    @ApiOperation({ summary: 'Remove user from project' })
    @ApiResponse({
        status: 200,
        description: 'Project',
        type: Issue,
    })
    removeUser(@Param('code') id: string, @Param('user') user: string): Promise<Issue> {
        return this.issueService.removeUser(id, user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove issue' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    remove(@Param('id') id: string): Promise<void> {
        return this.issueService.remove(id);
    }
}
