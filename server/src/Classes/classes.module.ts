import { Module } from "@nestjs/common";
import { ClassesController } from "./classes.controller";
import { ClassService } from "./classes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassesEntity } from "./classes.entity";


@Module({
    imports: [TypeOrmModule.forFeature([ClassesEntity])],
    controllers: [ClassesController],
    providers: [ClassService],
    exports : [ClassService]
})
export class ClassModule { }    