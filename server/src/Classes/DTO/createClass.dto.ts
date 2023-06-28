import { IsNotEmpty } from "class-validator"

export class CreateClassDTO {

    @IsNotEmpty()
    readonly school: string

    @IsNotEmpty()
    readonly city: string

    @IsNotEmpty()
    readonly schoolClass: string

    @IsNotEmpty()
    readonly departmant: string
    
    @IsNotEmpty()
    readonly subject: string


    @IsNotEmpty()
    readonly abbrevation: string
}