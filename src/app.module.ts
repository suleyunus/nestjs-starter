import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as SuperTokensConfig from './supertokens/config'
import { SuperTokensAuthGuard, SuperTokensModule } from 'supertokens-nestjs'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface'
import { CoreModule } from './core/core.module'

@Module({})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      controllers: [AppController],
      providers: [
        AppService,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        {
          provide: APP_GUARD,
          useClass: SuperTokensAuthGuard,
        },
      ],
      imports: [
        SuperTokensModule.forRoot({
          framework: 'express',
          supertokens: {
            connectionURI: SuperTokensConfig.connectionURI,
          },
          appInfo: SuperTokensConfig.appInfo,
          recipeList: SuperTokensConfig.recipeList,
        }),
        CoreModule.forRoot(options),
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot(),
        CqrsModule.forRoot(),
      ],
    }
  }
}
