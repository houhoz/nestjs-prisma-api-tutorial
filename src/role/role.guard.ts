import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from './role.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { ApiException } from '../common/filter/http-exception/api.exception';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    interface CusRequest extends Request {
      user?: any;
    }

    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    if (roles && roles.length === 0) return true;

    const request: CusRequest = context.switchToHttp().getRequest();

    // console.log('request', request?.user);

    // request {
    //   sub: '6520b93b831e43015766e955',
    //   email: '1@qq.com',
    //   iat: 1696779289,
    //   exp: 1696786489
    // }

    if (request?.user) {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: request?.user.email,
        },
        include: {
          roles: true,
        },
      });

      const userRoles = user.roles.map((item) => item.name);

      const isIncludeUser = userRoles.some((item) => roles.includes(item));
      if (!isIncludeUser) {
        throw new ApiException('权限不足', ApiErrorCode.Forbidden);
      }
      return true;
    }

    return true;
  }
}
