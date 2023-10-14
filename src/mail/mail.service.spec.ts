import * as MailParser from 'mailparser';

import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from './mail.service';
import axios from 'axios';

jest.mock('axios');

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse mail and extract JSON from attachment', async () => {
    jest.spyOn(MailParser, 'simpleParser').mockImplementationOnce(async () => ({
      attachments: [
        {
          filename: 'data.json',
          content: Buffer.from(JSON.stringify({ key: 'value' })),
        },
      ],
    }));

    const result = await service.parseMail('../../email-with-attachment.eml');
    expect(result).toEqual({ key: 'value' });
  });

  it('should parse mail and extract JSON from link in body', async () => {
    jest.spyOn(MailParser, 'simpleParser').mockImplementationOnce(async () => ({
      text: 'Find the data at https://tools.learningcontainer.com/sample-json-file.json',
    }));
    jest.spyOn(axios, 'get').mockImplementationOnce(async () => ({
      data: {
        Name: 'Test',
        Mobile: '12345678',
        Boolean: true,
        Pets: ['Dog', 'car'],
        Address: {
          'Permanent address': 'USA',
          'current Address': 'AU',
        },
      },
    }));

    const result = await service.parseMail(
      '../../email-with-link-on-attachment.eml',
    );
    expect(result).toEqual({
      Name: 'Test',
      Mobile: '12345678',
      Boolean: true,
      Pets: ['Dog', 'car'],
      Address: {
        'Permanent address': 'USA',
        'current Address': 'AU',
      },
    });
  });

  it('should parse mail and extract JSON from webpage link in body', async () => {
    jest.spyOn(MailParser, 'simpleParser').mockImplementationOnce(async () => ({
      text: 'Find the data on the page https://example.com/page.html',
    }));
    jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(async () => ({
        data: '<html><body><a href="https://example.com/data.json">JSON Link</a></body></html>',
      }))
      .mockImplementationOnce(async () => ({
        data: { key: 'value' },
      }));

    const result = await service.parseMail('path/to/mail.eml');
    expect(result).toEqual({ key: 'value' });
  });

  it('should throw error if no JSON found', async () => {
    jest.spyOn(MailParser, 'simpleParser').mockImplementationOnce(async () => ({
      text: 'No JSON link or attachment here',
    }));

    await expect(service.parseMail('path/to/mail.eml')).rejects.toThrow(
      'No JSON found',
    );
  });
});
