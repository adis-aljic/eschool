import { IsNotEmpty, IsStrongPassword, IsStrongPasswordOptions } from "class-validator"
import { ClassesEntity } from "src/Classes/classes.entity"

const options: IsStrongPasswordOptions = {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
}

export class UpdateUserDTO {


    @IsNotEmpty()
    @IsStrongPassword(options)
    readonly password: string

    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    isAuth: boolean

    readonly classes: ClassesEntity[]

    readonly subject: string
}