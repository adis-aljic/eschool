import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CurriculumDTO } from "./DTO/curriculum.dto";
import { ExpressRequest } from "src/User/globalType/expressRequest.interface";

@Controller()
export class CurriculumController {

    constructor(private readonly curriculumService : CurriculumService){}

    @Post("api/curriculum/addcurriculum")
    async addCurriculum(@Body() curriculumDTO : CurriculumDTO){
        // console.log(curriculumDTO);
        return await this.curriculumService.addCurriculum(curriculumDTO)
    }
    @Post("api/curriculum/list")
    async listCurriculum(@Body("id", ParseIntPipe) id : number) : Promise <any>{
      
        return await this.curriculumService.listCurriculum(id)
    }
    @Post("api/curriculum/deleteCurriculum")
    async deleteCurriculum(@Body("id", ParseIntPipe) id : number) : Promise <any>{
            
        return await this.curriculumService.deleteCurriculum(id)
    }
}