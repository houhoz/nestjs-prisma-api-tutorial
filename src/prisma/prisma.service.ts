import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasourceUrl: 'mongodb+srv://hyzhao:OkHv8vwI5amxLlFp@cluster0.xkiccv3.mongodb.net/prisma'
    })
  }
}
