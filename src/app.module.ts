import { ConfigModule, config } from '@app/config';
import { DBModule, mongodb_entities, mysql_entities } from '@app/db';
import {
  RestaurantController, RestaurantCouponController,
  RestaurantMenuController, RestaurantOrderController,
  RestaurantReviewController,
  UserController, UserCouponController, UserMenuController,
  UserOrderController, UserReviewController,
} from './controller';
import { UtilModule, UtilService } from '@app/util';
import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './app.guard';
import { CouponModule } from '@app/coupon';
import { MenuModule } from '@app/menu';
import { Module } from '@nestjs/common';
import { OrderModule } from '@app/order';
import { RestaurantModule } from '@app/restaurant';
import { ReviewModule } from '@app/review';
import { TypeModule } from '@app/type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user';

@Module({
  controllers: [
    RestaurantController, RestaurantMenuController,
    RestaurantCouponController, RestaurantOrderController,
    RestaurantReviewController,
    UserController, UserCouponController, UserMenuController,
    UserOrderController, UserReviewController,
  ],
  imports: [
    CouponModule, DBModule, MenuModule, OrderModule,
    RestaurantModule, ReviewModule, TypeModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'mysql',
      useFactory() {
        return { ...config.mysql_config, entities: mysql_entities };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'mongodb',
      useFactory() {
        return { ...config.mongodb_config, entities: mongodb_entities };
      },
    }),
    UserModule, UtilModule],
  providers: [{
    inject: [UtilService],
    provide: APP_GUARD,
    useClass: AppGuard,
  }],
})
export class AppModule {
}
