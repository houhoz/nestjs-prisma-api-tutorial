import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @ApiProperty({
    example: '1@qq.com',
    description: '邮箱',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}
