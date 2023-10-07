import { Injectable } from '@nestjs/common';
import { ApiErrorCode } from './../common/enums/api-error-code.enum';
import { ApiException } from './../common/filter/http-exception/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto';

@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const name = createPermissionDto.name;
    const existPermission = await this.prismaService.permission.findUnique({
      where: {
        name,
      },
    });

    if (existPermission)
      throw new ApiException('权限字段已存在', ApiErrorCode.PERMISSSION_EXIST);
    return await this.prismaService.permission.create({
      data: {
        name: createPermissionDto.name,
        desc: createPermissionDto.desc,
      },
    });
  }
}
