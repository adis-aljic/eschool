import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from 'src/User/user.module';
import { UserService } from 'src/User/user.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get("MAIL_HOST"),
                    secure: true,
                    port : 465,
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASSWORD'),
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                    
                    defaults: {
                        from: `"No reply" <${config.get("MAIL_FROM")}>`
                    },
                    template: {
                        dir: join("src", "mail", 'templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },

                    },
                },
            }),
            inject: [ConfigService],
        }),

    ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class MailModule { }
