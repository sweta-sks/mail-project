import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Deployment on AWS with Travis CI was successful.';
  }
}
