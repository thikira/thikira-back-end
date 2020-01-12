import { Body, Controller, HttpCode, InternalServerErrorException, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckEmailDto, SignInDto, SignUpDto } from './dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('Restaurant')
@Controller('api/restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService) {
  }

  @Post('check_email')
  @HttpCode(200)
  @ApiOperation({ summary: '이메일 확인' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 409 })
  public async check_email(@Body(new ValidationPipe()) payload: CheckEmailDto) {
    try {
      return await this.service.check_email(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('sign_up')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200 })
  public async sign_up(@Body(new ValidationPipe()) payload: SignUpDto) {
    try {
      return await this.service.sign_up(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('auth/sign_in')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  public async sign_in(@Body(new ValidationPipe()) payload: SignInDto) {
    try {
      return await this.service.sign_in(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}