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

    @Patch('update/:code')
    @ApiOperation({ summary: 'Update issue' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    update(@Param('code') code: string, @Body() data: UpdateIssueDto): Promise<Issue> {
        console.log('body', data);
        return this.issueService.update(code, data);
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

    @Patch('column')
    @ApiOperation({ summary: 'Update issues column' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    updateColumn(@Body() data: UpdateIssueDto[]): Promise<boolean> {
        return this.issueService.updateOrder(data);
    }

    @Patch('list')
    @ApiOperation({ summary: 'Update issues list' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    updateList(@Body() data: UpdateIssueDto): Promise<boolean> {
        return this.issueService.updateList(data);
    }

    @Patch('list-order')
    @ApiOperation({ summary: 'Update issues list' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    updateListAndOrder(@Body() data: UpdateIssueDto): Promise<boolean> {
        return this.issueService.updateListAndOrder(data);
    }

    @Patch('users/:code')
    @ApiOperation({ summary: 'Change issues users' })
    @ApiResponse({
        status: 200,
        description: 'Issue',
        type: Issue,
    })
    changeUser(@Param('code') id: string, @Body() user: string[]): Promise<Issue> {
        return this.issueService.changeUser(id, user);
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
