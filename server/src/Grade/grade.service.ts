import { InjectRepository } from "@nestjs/typeorm";
import { GradeEntity } from "./grade.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GradeDTO } from "./DTO/grade.dto";
import { UserEntity } from "src/User/user.entity";
import { DeleteGradeDTO } from "./DTO/deleteGrade.dto";

@Injectable()
export class GradeService {

constructor(@InjectRepository(GradeEntity) private readonly gradeRepository : Repository<GradeEntity>, 
@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity> ) {}

async addGrade(gradeDTO : GradeDTO) : Promise <any> {
    console.log(gradeDTO);
    const student = await this.userRepository.findOneBy({id : gradeDTO.studentId})
    const newGrade = new GradeEntity()
    newGrade.grade = gradeDTO.grade
    newGrade.teacherId = gradeDTO.teacherId
    newGrade.user = student
    console.log(student);
    console.log(newGrade);

     await this.gradeRepository.save(newGrade)
     throw new HttpException("Grade is added" , HttpStatus.OK)        

    
    
    }
    async deleteGrade(deleteGradeDTO : DeleteGradeDTO){

        const grades = await this.gradeRepository.findOne({
            where: {
                grade : deleteGradeDTO.grade,
                user :{
                    id : deleteGradeDTO.studentId
                }
            }
        })
        if(!grades) {
            throw new HttpException("Grade is not found!" , HttpStatus.BAD_REQUEST)
            
        }
        // const grade = grades.find(({grade}) => grade == deleteGradeDTO.grade).grade;
        await this.gradeRepository.delete({
            id: grades.id
        })
        console.log(grades);
        throw new HttpException("Grade is deleted" , HttpStatus.OK)        

        

    }

}