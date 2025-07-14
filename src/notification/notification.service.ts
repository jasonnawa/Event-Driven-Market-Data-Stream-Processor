// notification.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('MAIL_HOST'),
      port: parseInt(configService.get<string>('MAIL_PORT') || '587'),
      secure: false,
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Stock Alerts" <${this.configService.get('MAIL_USER')}>`,
        to,
        subject,
        text,
      });

      this.logger.log(`📧 Email sent to ${to}: ${info.messageId}`);
    } catch (err) {
      this.logger.error(`❌ Failed to send email to ${to}:`, err);
    }
  }
}
