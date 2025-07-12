import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as SuperTokensConfig from './config'
import { SuperTokensAuthGuard, SuperTokensModule } from 'supertokens-nestjs'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    SuperTokensModule.forRoot({
      framework: 'express',
      supertokens: {
        connectionURI: SuperTokensConfig.connectionURI,
      },
      appInfo: SuperTokensConfig.appInfo,
      recipeList: SuperTokensConfig.recipeList,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SuperTokensAuthGuard,
    },
  ],
})
export class AppModule {}
