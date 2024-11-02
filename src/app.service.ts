import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nakul bro - with Removed CLI install command from cloud build yaml2.!';
  }
}
