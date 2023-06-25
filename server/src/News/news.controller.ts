import { Body, Controller, Post, Req, Get, ParseIntPipe } from "@nestjs/common";
import { CreateNewsDTO } from "./DTO/news.dto";
import { NewsService } from "./news.service";
import { ExpressRequest } from "src/User/globalType/expressRequest.interface";

@Controller()
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post("api/news")
    async createNews (@Body() createNewsDto : CreateNewsDTO) :Promise <any> {
    // console.log(createNewsDto.classes["id"]);
    console.log(createNewsDto);
            
        return await this.newsService.createNews(createNewsDto)   

            
    }
    
    @Post("api/news/list")
 async listNews(@Body("userId", ParseIntPipe) userId:number ):Promise<any>{
    // console.log(id["id"]);
    // console.log(userId, classesId);
    
    
    
    return await this.newsService.listNews(userId);
        }

        @Get("api/news/studentNews")
        async getStudentNews() :Promise<any>{
            return await this.newsService.getStudentNews()
        }
}

