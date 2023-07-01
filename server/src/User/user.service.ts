import { Repository } from "typeorm/repository/Repository";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/createUser.dto";
import { sign, verify } from "jsonwebtoken"
import { JWT } from "src/config";
import { LoginUserDto } from "./DTO/loginUser.dto";
import { compare, hash } from "bcrypt";
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDTO } from "./DTO/updateUser.dto";
import { RegisterClass } from "./DTO/registerClass.dto";
import { ClassesEntity } from "src/Classes/classes.entity";
import { CreateStudentDTO } from "./DTO/createStudent.dto";
import { UserType } from "./type/user.type";
import { SendMessageDTO } from "./DTO/sendMessage.dto";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
     private mailerService: MailerService,
     @InjectRepository(ClassesEntity) private readonly classReposotory : Repository<ClassesEntity>     ) { }

    async sendUserConfirmation(user: any) {

        // console.log(user);

        const url = `https://eschool-pw0m.onrender.com/api/user/auth/${user.id}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: `Welcome ${user.firstName} ${user.lastName}! Confirm your Email`,
            template: './confirmation',
            context: {
                name: `${user.firstName} ${user.lastName}`,
                url,
            },
        });
    }


    async updatePassword(body : any){
        const checkIfUserExist = await this.userRepository.findOne({
            select: ["id", "email", "firstName", "lastName", "password"],
            where: { email: body.email }
        })

        // console.log(checkIfUserExist.password);

        if (!checkIfUserExist) {

            throw new HttpException("User doesent exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        else {

            const password = body.password
            await this.mailerService.sendMail({
                to: checkIfUserExist.email,
                subject: "New Password Eschool",
                template: "message",
                context: {
                    name: `${checkIfUserExist.firstName} ${checkIfUserExist.lastName}`,
                    info: `Your new password is ${password}`
                }
            })
            checkIfUserExist.password = await hash(password, 10)
            // console.log(checkIfUserExist);
            
            await this.userRepository.save(checkIfUserExist)
            return ({         message :    `Password is changed to ${body.password}. Check your email`
        })
        }

    }

    async recievedNewPass(email: string) {
        const checkIfUserExist = await this.userRepository.findOne({
            select: ["id", "email", "firstName", "lastName", "password"],
            where: { email: email }
        })

        // console.log(checkIfUserExist.password);

        if (!checkIfUserExist) {

            throw new HttpException("User doesent exist", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        else {

            // const password = `${checkIfUserExist.firstName}_${checkIfUserExist.lastName}_${checkIfUserExist.id}_A%`
            const password = "Adis123%"
            // console.log(password, " password");
            await this.mailerService.sendMail({
                to: checkIfUserExist.email,
                subject: "Recovered Password",
                template: "confirmation",
                context: {
                    name: `${checkIfUserExist.firstName} ${checkIfUserExist.lastName}`,
                    url: `Your new password is ${password}. You can change password from your profile after you loggin.`
                }
            })
            checkIfUserExist.password = await hash(password, 10)
            // console.log(checkIfUserExist);
            
            await this.userRepository.save(checkIfUserExist)
            return ({ "status": "recovered password" })
        }
    }

    async createUser(createUserDTO: CreateUserDTO) {

        const checkIfUserExist = await this.userRepository.findOneBy({ email: createUserDTO.email })
        if (checkIfUserExist) {

            throw new HttpException("User exist, email is taken", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity() as any
        Object.assign(newUser, createUserDTO)
        // newUser.isAuth = true;

        await this.userRepository.save(newUser)
        await this.userRepository.findOne({ where: { email: newUser.email } })
        this.sendUserConfirmation(newUser)

        return newUser
    }

    generateJWT(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }, JWT)
    }
    userResponse(user: UserEntity): any {
        return {
            ...user,
            token: this.generateJWT(user)
        }
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            select: ["id", "email", "firstName", "lastName", "password", "role", "isAuth"],
            where: { email: loginUserDto.email }
        })

        // console.log(user , "user");


        if (!user) {
            throw new HttpException("Username or password is incorrect", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if (!user.isAuth) {
            throw new HttpException("You must confirm your account. Please check your email for confirmation link", HttpStatus.UNAUTHORIZED)
        }
        // console.log(user.password, loginUserDto.password);
        
        const isPasswordCorrect = await compare(loginUserDto.password, user.password)
        // console.log(isPasswordCorrect);
        
        if (!isPasswordCorrect) {
            throw new HttpException("Credentional is not valid", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        delete user.password
        
        return user
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({ id })
    }

    async authUser(id: number): Promise<any> {
        const found = await this.userRepository.findOneBy({ id })


        if (!found) {
            throw new NotFoundException("User with ID not found")
        }
        else {
            found.isAuth = true;

            return this.userRepository.save(found)
        }
    }

        async addExistingStudent (email :string , classId : number) {
            const foundClass = await this.classReposotory.findOne(
                {
                    relations :["user"],
                   where: {id: classId}
                }
                   )
            const foundUser = await this.userRepository.findOneBy({email:email})
            if(!foundClass) {
                throw new HttpException("Class doesn't exist", HttpStatus.BAD_REQUEST)
            }
            foundClass.user = [...foundClass.user ,  foundUser]
            await this.classReposotory.save(foundClass)
            await this.mailerService.sendMail({
                to: email,
                subject: "New Class",
                template: "/.confirmation",
                context: {
                    name: `${foundUser.firstName} ${foundUser.lastName}`,
                    url: `You are added to new class ${foundClass.schoolClass} ${foundClass.departmant} in school ${foundClass.school}`
                }
            })
        }


        async addStudent(createStudentDTO : CreateStudentDTO): Promise <any>{
            console.log(createStudentDTO);
            
            const foundClass = await this.classReposotory.findOne(
                {
                    relations :["user"],
                   where: {id:createStudentDTO.classId}
                }
                   )
            const foundUser = await this.userRepository.findOneBy({email:createStudentDTO.email})
            if(foundUser){

                throw new HttpException("User already exist", HttpStatus.BAD_REQUEST)
            }
            if(!foundClass) {
                throw new HttpException("Class doesn't exist", HttpStatus.BAD_REQUEST)
            }
            
            delete createStudentDTO.classId
            const newStudent = new UserEntity()
            Object.assign(newStudent, createStudentDTO)
            newStudent.isAuth = true
            await this.userRepository.save(newStudent)
            console.log(newStudent);
            foundClass.user = [...foundClass.user ,  newStudent]
            // console.log(foundClass, " found class");
            // console.log(foundClass);
            // await this.classReposotory.createQueryBuilder().insert().relation(foundUser: UserEntity,)
            await this.classReposotory.save(foundClass)
            await this.mailerService.sendMail({
                to: newStudent.email,
                subject: "Password",
                template: "studentMail",
                context: {
                    name: `${newStudent.firstName} ${newStudent.lastName}`,
                    info: `Your new password is ${newStudent.password}. You can change password in profile page after you loggin`
                }
            })
            return newStudent
        }

        async findTeachers() : Promise <any> {
            const teachers = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.classes", "classes")
            .setFindOptions({
              where : {
                role : "teacher"
              }
            })
            .getMany()
            // console.log("Aaa");
            
            return teachers
        }

        async currentUser (id:number) : Promise<any>{
            const user = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.classes","classes")
            .leftJoinAndSelect("user.grades", "grades")
            .leftJoinAndSelect("user.notes", "notes")
            .setFindOptions({
                where :  {
                    id : id
            }
            }).getMany()
            // console.log(id);
            console.log(user);
            
            if(user.length ===0) {
                throw new HttpException("User doesent Exist!",HttpStatus.BAD_REQUEST)
            }
            // console.log(user);
            
            return user
        }
        async findAllStudents(){
           const students = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.classes","classes")
            .leftJoinAndSelect("user.grades", "grades")
            .leftJoinAndSelect("user.notes", "notes")
            .setFindOptions({
                where : {
                    role : "student"
                }
            })
            .getMany()
            // console.log(students);
            // console.log("students");
            return students
            
        }

        async sendMessage(sendMessageDTO : SendMessageDTO){
            
            await this.mailerService.sendMail({
                to: sendMessageDTO.teacherEmail,
                subject: `Student: ${sendMessageDTO.studentName} : ${sendMessageDTO.title}`,
                template: './studentMail',
                context: {
                  teacherFullName : sendMessageDTO.teacherFullName,
                  school : sendMessageDTO.school,
                  schoolClass : sendMessageDTO.schoolClass,
                  classCode : sendMessageDTO.classCode,
                  student : sendMessageDTO.studentName,
                  email : sendMessageDTO.studentEmail,
                  title : sendMessageDTO.title,
                  message : sendMessageDTO.message
                },
            });
        }

}

