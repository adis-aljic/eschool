import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "./news.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { ClassService } from "src/Classes/classes.service";
import { ClassModule } from "src/Classes/classes.module";
import { ClassesEntity } from "src/Classes/classes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity,ClassesEntity]),ClassModule],
    controllers: [NewsController],
    providers: [NewsService , ClassService],
    exports: []
})
export class NewsModule { }
