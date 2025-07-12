import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appInfo } from './config'
import supertokens from 'supertokens-node'
import { SuperTokensExceptionFilter } from 'supertokens-nestjs'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [appInfo.websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
  app.useGlobalFilters(new SuperTokensExceptionFilter())

  app.use(helmet())

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
  })

  const enableSwagger = process.env.ENABLE_SWAGGER === 'true'

  if (enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('My App')
      .setDescription('The My App description')
      .addTag('my-app')
      .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
      useGlobalPrefix: true,
    })
  }

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap().catch((error) => console.error('Error during bootstrap:', error))
