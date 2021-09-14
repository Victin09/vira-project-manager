import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LoginDto } from '../users/dto/login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }
}
