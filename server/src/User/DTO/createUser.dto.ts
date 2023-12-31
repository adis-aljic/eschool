import { IsEmail, IsNotEmpty, IsStrongPassword, IsStrongPasswordOptions } from "class-validator"

const options: IsStrongPasswordOptions = {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
}

export class CreateUserDTO {
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsStrongPassword(options)
    readonly password: string

    @IsNotEmpty()
    readonly firstName: string

    @IsNotEmpty()
    readonly lastName: string


}