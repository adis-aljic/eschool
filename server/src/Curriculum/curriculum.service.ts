import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CurriculumEntity } from "./curriculum.entity";
import { CurriculumDTO } from "./DTO/curriculum.dto";
import { UserEntity } from "src/User/user.entity";

@Injectable()
export class CurriculumService {
constructor(@InjectRepository(CurriculumEntity) private readonly curriculumRepository : Repository<CurriculumEntity>,
@InjectRepository(UserEntity) private  readonly userRepository : Repository<UserEntity>){}

    async addCurriculum(curriculumDTO : CurriculumDTO) : Promise<any>{
        
        const curriculumData = {
            classCode : curriculumDTO.classCode,
            curriculum : curriculumDTO.curriculum
        }
        const userId = curriculumDTO.userId

        const user = await this.userRepository.findOneBy({
            id:userId
        })
        const newCurriculum = new CurriculumEntity();
        Object.assign(newCurriculum, curriculumData)
        newCurriculum.user = user

        return await this.curriculumRepository.save(newCurriculum)

        
    }
    async listCurriculum(id:number){
        const curriculum = await this.curriculumRepository.find({
            relations : {
                user:true
            },
            where: {

                user: {
                    id : id
                }
            }
            
        })
        // console.log(curriculum);
        
        return curriculum
    }
    async deleteCurriculum(id:number){
        const curriculum = await this.curriculumRepository.delete({
            id : id
        })
        // console.log(curriculum);
        console.log(curriculum);
        
        return curriculum
    }

}