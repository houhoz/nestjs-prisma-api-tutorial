import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { decrypt } from './../utils';
import { LoginAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginAuthDto.email,
      },
    });
    if (!user) throw new ForbiddenException('用户不存在');

    const pwMatches = decrypt(user.password) === loginAuthDto.password;

    if (!pwMatches) throw new UnauthorizedException('密码不正确');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
