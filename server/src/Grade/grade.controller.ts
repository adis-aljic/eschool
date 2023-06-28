import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { GradeDTO } from "./DTO/grade.dto";
import { DeleteGradeDTO } from "./DTO/deleteGrade.dto";
@Controller()
export class GradeController {
constructor(private readonly gradeService : GradeService){}

@Post("api/grade/add")
async addGrade(@Body() gradeDTO :GradeDTO ){
    return this.gradeService.addGrade(gradeDTO)
    // return gradeDTO
    
}
@Post("api/grade/delete")
async deleteGrade(@Body() deleteGradeDTO : DeleteGradeDTO) {
    return this.gradeService.deleteGrade(deleteGradeDTO)
}

}