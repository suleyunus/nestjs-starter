import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestExceptionFilter
  implements ExceptionFilter
{
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse() satisfies Response

    let status = HttpStatus.BAD_REQUEST
    let message = 'Invalid data input'

    switch (exception.code) {
      case 'P2000':
      case 'P2006':
      case 'P2012':
        status = HttpStatus.BAD_REQUEST
        message = `Invalid data input`
        break
      case 'P2001':
      case 'P2025':
        status = HttpStatus.NOT_FOUND
        message = `The requested resource was not found`
        break
      case 'P2002':
        status = HttpStatus.CONFLICT
        message = `Resource already exists`
        break
    }

    response.status(status).json({
      statusCode: status,
      message,
    })
  }
}
