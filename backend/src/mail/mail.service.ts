import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { join } from 'path';
import ical from 'ical-generator';
@Injectable()
export class MailService {
  async sendMail() {
    const html = await this.getTemplate('default');

    const iCalContent = await this.createCalendarEvent();
    console.log(iCalContent);
    const transporter = this.getTransporter();

    await transporter.sendMail({
      from: 'defaultmail@gmail.com', // sender address
      to: 'sweta@mollatech.com', // mail of receivers
      subject: 'Test mail',
      html: html,
      alternatives: {
        contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
        method: 'REQUEST',
        content: iCalContent,
      },
    });
    return {
      message: 'Mail sent successfully',
    };
  }

  async createCalendarEvent() {
    const calendar = ical({ name: 'my first iCal' });
    const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(startTime.getHours() + 1);
    const createEvent = {
      start: startTime,
      end: endTime,
      location: 'Kolkata',
      organizer: {
        name: 'Sebastian Pekarek',
        email: 'abcd@gmail.com',
      },
      summary: 'Example Event',
      description: 'It works :)',
      url: 'http://sebbo.net/',
    };
    calendar.createEvent(createEvent);
    const iCalContent = calendar.toString();
    return iCalContent;
  }

  async getTemplate(template: string) {
    const templateDir = join(__dirname, 'templates');
    const path = `${templateDir}/${template}.html`;

    const html = fs.promises.readFile(path, 'utf8');

    return html;
  }

  getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_TLS === 'yes' ? true : false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
}
