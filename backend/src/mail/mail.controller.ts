import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('mails')
@ApiTags('mails')
export class MailController {
  constructor(private readonly mailsService: MailService) {}

  @Get()
  sendMail() {
    return this.mailsService.sendMail();
  }
}
