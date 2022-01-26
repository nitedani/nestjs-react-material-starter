import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import registerTemplateHtml from './register.template.html';
import * as argon2 from 'argon2';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { ConfigService } from '../../config/config.service';
import { Provider, User } from '@prisma/client';
const argon2Opts = {
  type: argon2.argon2id,
  timeCost: 8,
  saltLength: 64,
  memoryCost: 2 ** 16,
};

@Injectable()
export class LocalAuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email);
    const user = await this.usersService.findOneByProvider(
      Provider.LOCAL,
      email,
    );

    // Wrong email
    if (!user)
      throw new UnauthorizedException(
        `The email address ${email} is not associated with any account.`,
      );

    const valid = await argon2.verify(user.password, pass, argon2Opts);

    if (valid) {
      if (!user.isVerified)
        throw new UnauthorizedException('Your account has not been verified.');
      const { password, ...result } = user;

      return result;
    }

    // Wrong password
    throw new UnauthorizedException('Invalid email or password');
  }

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const foundUser = await this.usersService.findOneByProvider(
      Provider.LOCAL,
      email,
    );
    if (foundUser)
      throw new BadRequestException(
        'The email address you have entered is already associated with another account.',
      );

    const hashed = await argon2.hash(password, argon2Opts);

    try {
      const newUser = await this.usersService.create({
        provider: Provider.LOCAL,
        providerId: email,
        username: email,
        password: hashed,
      });
      return await this.sendConfirmationEmail(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendConfirmationEmail(user: User): Promise<string> {
    try {
      const NODE_ENV = this.configService.get('NODE_ENV');
      const DOMAIN = this.configService.get('DOMAIN');
      const MAIL_FROM = this.configService.get('MAIL_FROM');

      const { token } = await this.usersService.createToken(user.id);
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_API_KEY,
        },
      });
      const template = handlebars.compile(registerTemplateHtml);

      const mailOptions = {
        from: MAIL_FROM,
        to: user.username,
        subject: 'Account Verification',
        html: template({
          link: `${NODE_ENV === 'production' ? 'https' : 'http'}://${
            DOMAIN ? DOMAIN : 'localhost'
          }/auth/local/confirm/${token}`,
        }),
      };

      await transporter.sendMail(mailOptions);
      return `A verification email has been sent to ${user.username}.`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verify(token: string) {
    const foundToken = await this.usersService.findToken(token);
    if (!foundToken)
      throw new NotFoundException(
        'Invalid verification link. The verification link may have expired.',
      );
    const user = await this.usersService.findOneById(foundToken.userId);
    if (!user)
      throw new NotFoundException(
        'We were unable to find the user for this token.',
      );
    if (user.isVerified)
      throw new BadRequestException('This user has already been verified.');

    const verifiedUser = await this.usersService.update({
      id: user.id,
      isVerified: true,
    });
    if (!verifiedUser) throw new InternalServerErrorException();
    return 'The account has been verified. Please sign in.';
  }
}
