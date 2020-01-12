import { ConfigService } from '@app/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { TokenTypeEnum } from './token-type.enum';

@Injectable()
export class UtilService {
  private readonly secret: Buffer;
  private readonly tokenRegExp = /^Bearer .+$/;

  constructor(private readonly config: ConfigService) {
    this.secret = config.JWT_SECRET ? Buffer.from(config.JWT_SECRET) : randomBytes(16);
  }

  public async encode(content: string): Promise<string> {
    return createHash(this.config.ENCIPHERMENT).update(content).digest('base64');
  }

  public async createToken(username: string, type: TokenTypeEnum): Promise<string> {
    const expiresIn = type.match(TokenTypeEnum.access) ? '30 min' : '14 days';
    return sign({ id: username }, this.secret, { expiresIn });
  }

  public async getTokenBody(token: string): Promise<string> {
    try {
      await this.tokenRegExp.test(token);
      return token.split(' ', 2)[1];
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  public async getEmailByToken(token: string): Promise<string> {
    try {
      const parsedToken = await verify(token, this.secret, {}) as undefined as { id: string };
      return parsedToken.id;
    } catch (e) {
      return null;
    }
  }
}
