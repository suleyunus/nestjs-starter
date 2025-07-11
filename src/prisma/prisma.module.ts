import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { APP_FILTER } from '@nestjs/core'
import { PrismaClientKnownRequestExceptionFilter } from './prisma-client-known-request-exception.filter'

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: PrismaClientKnownRequestExceptionFilter },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
