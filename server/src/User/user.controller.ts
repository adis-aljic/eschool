import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/createUser.dto";
import { UserType } from "./type/user.type";
import { LoginUserDto } from "./DTO/loginUser.dto";
import { ExpressRequest } from "./globalType/expressRequest.interface";
import { AuthGuard } from "src/guards/auth.guard";
import { UpdateUserDTO } from "./DTO/updateUser.dto";

import { RegisterClass } from "./DTO/registerClass.dto";
import { CreateStudentDTO } from "./DTO/createStudent.dto";
import { SendMessageDTO } from "./DTO/sendMessage.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(new ValidationPipe())
    @Post("/api/user/newuser")
    async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserType> {
        const user = await this.userService.createUser(createUserDTO)
        return this.userService.userResponse(user)
    }

    @UsePipes(new ValidationPipe())
    @Post("api/user/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserType> {
        const user = await this.userService.loginUser(loginUserDto)
        return this.userService.userResponse(user)

    }

    @Get("api/user/teachers")
    async findTeachers (){
        // console.log("aa");
        
        return await this.userService.findTeachers()
    }
    @Post("api/user")
    // @UseGuards(AuthGuard)
    // async currentUser(@Param("id", ParseIntPipe) id: number): Promise<any> {
    async currentUser(@Body("id", ParseIntPipe) id: number): Promise<any> {

        // console.log(id, " id1")
        return this.userService.currentUser(id)
    }

    @Get("api/user/auth/:id")
    // @UseGuards(AuthGuard)
    async authUser(@Param("id", ParseIntPipe) id: number): Promise<any> {
    
        return this.userService.authUser(id)
    }

    @Post("api/user/forgetenpassword")
    async recievedNewPass(@Body("email") email: string): Promise<any> {
        // console.log(email, "bu d");

        return this.userService.recievedNewPass(email)
    }

    @Post("api/user/updatePassword")
    async updatePassword(@Body() body : any){
       
        console.log(body);
        // return ({         message :    `Password is changed to ${body.password}. Check your email`})       
             return await this.userService.updatePassword(body)
        
        
    }

    @Post("api/user/newstudent")
    async addStudent(@Body() createStudentDTO : CreateStudentDTO): Promise <any>{
            console.log(createStudentDTO);
            
        return this.userService.addStudent(createStudentDTO)
    }
    @Post("api/user/findAndAddStudent")
    async addExistingStudent(@Body() body : any): Promise <any>{
        const {email , classId} = body
        return this.userService.addExistingStudent(email, classId)
    }
    
    @Get("api/user/getstudents")
    async findAllStudents() : Promise<any>{
        return this.userService.findAllStudents();
    }

    @Post("api/user/message")
    async sendMessage(@Body() sendMessageDTO : SendMessageDTO ){
        // console.log(sendMessageDTO);
        return this.userService.sendMessage(sendMessageDTO)
        
    }

}



