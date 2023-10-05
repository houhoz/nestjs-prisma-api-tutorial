import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiException } from './../common/filter/http-exception/api.exception'
import { ApiErrorCode } from './../common/enums/api-error-code.enum'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);
    const list = await this.prismaService.user.findMany();
    return list
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
