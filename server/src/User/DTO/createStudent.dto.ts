import { IsEmail, IsNotEmpty, IsStrongPassword, IsStrongPasswordOptions } from "class-validator"



export class CreateStudentDTO {
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string
    
    @IsNotEmpty()
    readonly role: string
    @IsNotEmpty()
     classId: number

}