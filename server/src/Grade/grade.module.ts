import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";
import { GradeEntity } from "./grade.entity";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";
import { UserModule } from "src/User/user.module";



@Module({
    imports: [TypeOrmModule.forFeature([GradeEntity, UserEntity]), UserModule],
    controllers: [GradeController],
    providers: [GradeService],
    exports: []
})
export class GradeModule { }
