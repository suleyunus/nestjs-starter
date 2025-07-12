import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appInfo } from './config'
import supertokens from 'supertokens-node'
import { SuperTokensExceptionFilter } from 'supertokens-nestjs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [appInfo.websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
  app.useGlobalFilters(new SuperTokensExceptionFilter())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap().catch((error) => console.error('Error during bootstrap:', error))
