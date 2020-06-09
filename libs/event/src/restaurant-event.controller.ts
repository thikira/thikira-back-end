import { DtoUploadEvent, Header, ResGetEventList } from '@app/type';
import { UtilService } from '@app/util';
import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EventService } from './event.service';

@ApiTags('restaurant/event')
@Controller('api/restaurant/event')
export class RestaurantEventController {
  @Inject()
  private readonly event_service: EventService;
  @Inject()
  private readonly util_service: UtilService;

  @Get()
  @ApiOperation({ summary: '업체 이벤트 조회' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  public async getEventList(): Promise<ResGetEventList[]> {
    try {
      return this.event_service.getList();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post()
  @ApiOperation({ summary: '업체 이벤트 등록' })
  @ApiCreatedResponse()
  public async uploadEvent(
    @Headers() header: Header,
    @Body(new ValidationPipe()) payload: DtoUploadEvent,
  ): Promise<void> {
    try {
      return this.event_service.upload(this.util_service.getTokenBody(header), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
