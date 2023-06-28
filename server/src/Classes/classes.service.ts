import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassesEntity } from "./classes.entity";
import { CreateClassDTO } from "./DTO/createClass.dto";
import { Repository } from "typeorm";
import { RegisterClass } from "src/User/DTO/registerClass.dto";
import { decode, verify } from "jsonwebtoken";
import { JWT } from "src/config";
import { UserEntity } from "src/User/user.entity";
@Injectable()
export class ClassService {
    find(arg0: {
        relations: { user: boolean; }; where: { // console.log(schoolClass);
            id: any; // console.log(schoolClass);
        }; // console.log(schoolClass);
    }) {
        throw new Error("Method not implemented.");
    }
    constructor(@InjectRepository(ClassesEntity)
    private readonly classRepository: Repository<ClassesEntity>) { }
    async createClass(createClassDTO: CreateClassDTO)
        : Promise<ClassesEntity> {

        const schoolClass = new ClassesEntity()
        Object.assign(schoolClass, createClassDTO)
        const foundClass = await this.classRepository.findOneBy({
            abbrevation : createClassDTO.abbrevation
        })
        if(foundClass){
             throw new HttpException("Class already exist", HttpStatus.BAD_REQUEST)
             
        }
        // console.log(schoolClass);
        return await this.classRepository.save(schoolClass)
    }

    async listClass() {
        return await this.classRepository.find()
        // return ["Aaa", "gg"]
    }



    async addClassToUser(token: string, id: number): Promise<ClassesEntity> {
        const decode = verify(token, JWT) as any

        const classes = await this.classRepository.findOneBy({ id: id })
        try {
            // console.log(classes);
            // if (classes.user) {

            //     classes.user.map((user) => {

            //         if (user.id === decode.id) {
            //             throw new HttpException("Class is already assinged", HttpStatus.NOT_ACCEPTABLE)
            //         } // hendlat na frontendu
            //     })
            // }
            classes.user = [decode]
            // console.log(classes);


            await this.classRepository.save(classes)
        }
        catch {
            console.log("error");

        }
        return classes
        // return {
        //     "statusCode": 200,
        //     "message": "Class is susscesfully registered"
        // } as any
        // const user = decode(token, JWT)
    }

    async listMyClasses(id: number) {
        const myClasses = await this.classRepository.find({
            relations: { user: true },
            where: {
                user: { id: id },
            },
        })
        return myClasses
    }
    // const myClasses = await this.classRepository.findBy({ userId: id })
    // console.log(myClasses);

    async unregisterClass(userId: number, classId: number) {
        // console.log("logovano");
        // console.log(userId, classId);
        // const classes = await this.classRepository.delete({ id: classId })
        // // classes.user = [null]
        // console.log(classes);
        const newClass = await this.classRepository.findOne({
            relations: {
                user: true,
            },
            where: { id: classId }
        })
        // console.log(newClass);
        // console.log("newClass prvi");
        newClass.user = newClass.user.filter((user) => {
            console.log(user);

            user.id !== userId
        }
        )
        await this.classRepository.save(newClass)

        // await this.classRepository.save(classes)
        // console.log(newClass);

        return newClass

    }


}