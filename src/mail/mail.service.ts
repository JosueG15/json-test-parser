import * as MailParser from 'mailparser';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class MailService {
  async parseMail(filePathOrUrl: string): Promise<object> {
    const mailStream = filePathOrUrl.startsWith('http')
      ? await this.getMailStreamFromUrl(filePathOrUrl)
      : fs.createReadStream(filePathOrUrl);

    const mail = await MailParser.simpleParser(mailStream);
    return this.extractJson(mail);
  }

  private async getMailStreamFromUrl(
    url: string,
  ): Promise<NodeJS.ReadableStream> {
    const response = await axios.get(url, { responseType: 'stream' });
    return response.data;
  }

  private async extractJson(mail: MailParser.ParsedMail): Promise<any> {
    const jsonFromAttachments = this.extractJsonFromAttachments(mail);
    if (jsonFromAttachments) {
      return jsonFromAttachments;
    }

    const jsonFromLinkInText = await this.extractJsonFromLinkInText(mail.text);
    if (jsonFromLinkInText) {
      return jsonFromLinkInText;
    }

    const jsonFromWebpageLinkInText =
      await this.extractJsonFromWebpageLinkInText(mail.text);
    if (jsonFromWebpageLinkInText) {
      return jsonFromWebpageLinkInText;
    }

    throw new NotFoundException('No JSON found');
  }

  private extractJsonFromAttachments(mail: MailParser.ParsedMail): object {
    const jsonAttachment = mail.attachments?.find((attachment) =>
      attachment.filename.endsWith('.json'),
    );
    return jsonAttachment
      ? JSON.parse(jsonAttachment.content.toString())
      : null;
  }

  private async extractJsonFromLinkInText(text: string): Promise<object> {
    const jsonLinkMatch = text.match(/https?:\/\/[^\s]+\.json/);
    return jsonLinkMatch ? await this.fetchJson(jsonLinkMatch[0]) : null;
  }

  private async extractJsonFromWebpageLinkInText(
    text: string,
  ): Promise<object> {
    const webpageLinkMatch = text.match(/https?:\/\/[^\s]+/);
    if (webpageLinkMatch) {
      const webpageLink = webpageLinkMatch[0];
      const response = await axios.get(webpageLink);
      const body = response.data;
      const jsonLinkMatch = body.match(/https?:\/\/[^\s]+\.json/);
      return jsonLinkMatch ? await this.fetchJson(jsonLinkMatch[0]) : null;
    }
    return null;
  }

  private async fetchJson(url: string): Promise<object> {
    const response = await axios.get(url);
    return response.data;
  }
}
