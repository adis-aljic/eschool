import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "src/User/user.entity";
import { UserModule } from "src/User/user.module";
import { NoteEntity } from "./note.entity";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";



@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, UserEntity]), UserModule],
    controllers: [NoteController],
    providers: [NoteService],
    exports: []
})
export class NoteModule { }
