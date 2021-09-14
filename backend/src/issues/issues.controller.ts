import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('issues')
export class IssuesController {
    constructor(private readonly issueService: IssuesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.issueService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.issueService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: CreateIssueDto) {
        return this.issueService.create(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() data: UpdateIssueDto) {
        return this.issueService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.issueService.remove(id);
    }
}
