import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('parse')
  async parseMail(@Query('url') url: string) {
    return this.mailService.parseMail(url);
  }
}
