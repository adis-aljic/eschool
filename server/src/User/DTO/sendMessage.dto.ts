import { IsEmail, IsNotEmpty } from "class-validator"


export class SendMessageDTO {
    @IsEmail()
    readonly studentEmail: string
   
    @IsEmail()
    readonly teacherEmail: string

    @IsNotEmpty()
    readonly schoolClass: string

    @IsNotEmpty()
    readonly studentName: string

    @IsNotEmpty()
    readonly teacherFullName: string

    @IsNotEmpty()
    readonly classCode: string

    @IsNotEmpty()
    readonly school: string

    @IsNotEmpty()
    readonly message: string
    
    @IsNotEmpty()
    readonly title: string

   

}