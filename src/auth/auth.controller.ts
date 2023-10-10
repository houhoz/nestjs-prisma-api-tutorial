import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';
import { Public } from './decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '登录接口', // 接口描述信息
  })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @ApiOperation({
    summary: '测试',
  })
  @ApiBearerAuth()
  @Post('/test')
  test() {
    return 1;
  }
}
