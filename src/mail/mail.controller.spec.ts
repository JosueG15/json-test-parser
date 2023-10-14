import { Test, TestingModule } from '@nestjs/testing';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let controller: MailController;
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [MailService],
    }).compile();

    controller = module.get<MailController>(MailController);
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return parsed JSON when endpoint is hit', async () => {
    const mockJson = { key: 'value' };
    jest
      .spyOn(service, 'parseMail')
      .mockImplementationOnce(async () => mockJson);

    expect(
      await controller.parseMail('../../email-with-attachment.eml'),
    ).toEqual(mockJson);
  });
});
