import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@UseGuards(LocalAuthGuard)
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: 201,
        description: 'Token',
        type: String,
    })
    async login(@Body() data: LoginDto): Promise<{ access_token: string }> {
        return this.authService.login(data);
    }
}
