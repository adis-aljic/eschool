import { Module } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MailModule } from "src/mail/mail.module";
import { ClassModule } from "src/Classes/classes.module";
import { ClassesEntity } from "src/Classes/classes.entity";
import { ClassService } from "src/Classes/classes.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity,ClassesEntity]), MailModule,ClassModule],
    controllers: [UserController],
    providers: [UserService, MailModule, ClassService],
    exports: [UserService, MailModule]
})
export class UserModule { }
