import { Injectable } from '@nestjs/common';
import { ApiErrorCode } from './../common/enums/api-error-code.enum';
import { ApiException } from './../common/filter/http-exception/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const permissions = await this.prismaService.permission.findMany({
      where: {
        id: { in: createRoleDto.permissionIds },
      },
    });

    const name = createRoleDto.name;
    const existRole = await this.prismaService.role.findUnique({
      where: {
        name,
      },
    });

    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.ROLE_EXIST);

    const permissionIds = permissions.map((item) => item.id);
    return await this.prismaService.role.create({
      data: { name, permissionIds },
    });
  }
}
