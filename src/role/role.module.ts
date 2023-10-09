import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleGuard } from './role.guard';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class RoleModule {}
