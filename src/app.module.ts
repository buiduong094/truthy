import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import * as path from 'path';
import * as config from 'config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver
} from 'nestjs-i18n';
import { WinstonModule } from 'nest-winston';

import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/role/roles.module';
import { PermissionsModule } from 'src/permission/permissions.module';
import * as ormConfig from 'src/config/ormconfig';
import * as throttleConfig from 'src/config/throttle-config';
import { MailModule } from 'src/mail/mail.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { ProductModule } from 'src/product/product.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { I18nExceptionFilterPipe } from 'src/common/pipes/i18n-exception-filter.pipe';
import { CustomValidationPipe } from 'src/common/pipes/custom-validation.pipe';
import { TwofaModule } from 'src/twofa/twofa.module';
import { CustomThrottlerGuard } from 'src/common/guard/custom-throttle.guard';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { AppController } from 'src/app.controller';
import winstonConfig from 'src/config/winston';
import { CartsModule } from './cart/carts.module';
import { CartInforsModule } from './cartinfor/cartinfors.module';
import { CoperationsModule } from './coperation/coperations.module';
import { CustomEmailsModule } from './customemail/customemails.module';
import { FileUploadCustomsModule } from './fileuploadcustom/fileuploadcustoms.module';
import { HeaderCustomsModule } from './headercustom/headercustoms.module';
import { OrdersModule } from './order/orders.module';
import { OrderInforsModule } from './orderinfor/orderinfors.module';
import { ProductImagesModule } from './productimage/productimages.module';
import { QuickLinksModule } from './quicklink/quicklinks.module';
import { LabelcustomsModule } from './labelcustoms/labelcustoms.module';

const appConfig = config.get('app');

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ThrottlerModule.forRootAsync({
      useFactory: () => throttleConfig
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: appConfig.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true
        }
      }),
      parser: I18nJsonParser,
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang', 'locale', 'l']
        },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(['lang', 'locale', 'l'])
      ]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*']
    }),
    AuthModule,
    RolesModule,
    PermissionsModule,
    MailModule,
    ProductModule,
    RefreshTokenModule,
    TwofaModule,
    DashboardModule,
    CartsModule,
    CartInforsModule,
    CoperationsModule,
    CustomEmailsModule,
    FileUploadCustomsModule,
    HeaderCustomsModule,
    OrdersModule,
    OrderInforsModule,
    ProductImagesModule,
    QuickLinksModule,
    LabelcustomsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: I18nExceptionFilterPipe
    }
  ],
  controllers: [AppController]
})
export class AppModule {}
