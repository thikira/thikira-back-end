import { ParsedTokenClass } from '@app/type';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnumTokenType } from './enum/token-type.enum';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwt_service: JwtService;

  public createToken(id: number, type: EnumTokenType): string {
    return this.jwt_service.sign({ id }, {
      expiresIn: type === EnumTokenType.access ? '30 min' : '14 days',
    });
  }

  public parseToken(token: string): ParsedTokenClass {
    try {
      return this.jwt_service.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
