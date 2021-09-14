import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '../users/dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && user.validatePassword(pass)) {
            const { ...result } = user;
            return result;
        }
        return null;
    }

    async login(data: LoginDto) {
        const payload = { email: data.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
