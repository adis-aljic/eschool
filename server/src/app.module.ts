import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMidleware } from './User/middleware/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClassModule } from './Classes/classes.module';
import { NewsModule } from './News/news.module';
import { join } from 'path';
import { CurriculumModule } from './Curriculum/curriculum.module';
import { GradeModule } from './Grade/grade.module';
import { NoteModule } from './Notes/note.module';

@Module({
  imports:
   [ConfigModule.forRoot({
    isGlobal:true
   }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      
        type: "postgres" ,
        host: config.get('HOST_DB'),
        port: parseInt(config.get('PORT_DB')),
        username: config.get('USERNAME_DB'),
        password: config.get('PASSWORD_DB'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  
    }),

  }), UserModule, ClassModule, NewsModule, CurriculumModule,GradeModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMidleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
