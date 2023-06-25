import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurriculumEntity } from "./curriculum.entity";
import { CurriculumController } from "./curriculum.controller";
import { CurriculumService } from "./curriculum.service";
import { UserEntity } from "src/User/user.entity";
import { UserModule } from "src/User/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([CurriculumEntity, UserEntity]), UserModule],
    controllers: [CurriculumController],
    providers: [CurriculumService],
    exports : []
})
export class CurriculumModule { }    