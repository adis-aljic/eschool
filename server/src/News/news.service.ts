import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "./news.entity";
import { CreateNewsDTO } from "./DTO/news.dto";
import { ClassesEntity } from "src/Classes/classes.entity";
import { UserEntity } from "src/User/user.entity";
import { ClassService } from "src/Classes/classes.service";

@Injectable()
export class NewsService {
    constructor(@InjectRepository(NewsEntity) private readonly newsRepository : Repository<NewsEntity>,
    @InjectRepository(ClassesEntity) private readonly classReposotory : Repository<ClassesEntity>){}

    async createNews(createNewsDto:CreateNewsDTO) : Promise<NewsEntity>{
        const id = createNewsDto.classId
        // console.log(createNewsDto);
        
        const user = createNewsDto.user as UserEntity;
        // console.log(user);
        
        const result = await this.classReposotory.findOne({
            relations: {user: true},
            where : {id:id}
        })
        
        // console.log(result);
        const resultClass = await this.classReposotory.findOneBy({
            id : id
        })
        // console.log(resultClass, "result class");
        
        if(result.user.length === 0) {
            throw new HttpException("User is not assinged to this class." , HttpStatus.UNAUTHORIZED)
        }
        const bodyNews = {
            url : createNewsDto.url,
            text : createNewsDto.text,
            title : createNewsDto.title,
            school : createNewsDto.school,
            classId : createNewsDto.classId,
            schoolClass : createNewsDto.schoolClass,
            departmant : createNewsDto.departmant,
            city : createNewsDto.city

        }
        const news = new NewsEntity()
        Object.assign(news, bodyNews) 
        // console.log(news);
        // console.log("news basic " , user);
        news.user = [user]
        // news = schoolClass
        // console.log(news);
        // console.log("news after ");
        
      return  await this.newsRepository.save(news)
    }

    async listNews (userId:number)  {
        // console.log(userId);
        // console.log(classesId);
        
        const news =await this.newsRepository.createQueryBuilder("news")
        .leftJoinAndSelect("news.user","user")
        .setFindOptions({
            where : {user : {
                id : userId
            },  
            // classes : {
            //     id:classesId
            // }
        }
        }).getMany()
        // const news = await this.newsRepository.find({
        //     relations:["user","classes"],
        //     where : {
        //       user :  {

        //             id : userId}
        //         }
            
        // })
        // console.log(news, " news");
        
         return news
    }

    async getStudentNews (){
        const news =await this.newsRepository.createQueryBuilder("news")
        .leftJoinAndSelect("news.user","user").getMany()
        console.log(news);
        
        return news
    }
}