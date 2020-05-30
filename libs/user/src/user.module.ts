import { mongodbEntities, mysqlEntities } from '@app/entity';
import { RestaurantModule } from '@app/restaurant';
import { TokenModule } from '@app/token';
import { UtilModule } from '@app/util';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [
    RestaurantModule, TokenModule,
    TypeOrmModule.forFeature(mysqlEntities, 'mysql'),
    TypeOrmModule.forFeature(mongodbEntities, 'mongodb'),
    UtilModule,
  ],
  providers: [UserService],
})
export class UserModule {
}
