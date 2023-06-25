import { IsNotEmpty } from "class-validator"

export class RegisterClass {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    readonly school: string

    @IsNotEmpty()
    readonly city: string

    @IsNotEmpty()
    readonly cityAbb: string

    @IsNotEmpty()
    readonly schoolClass: string

    @IsNotEmpty()
    readonly departmant: string

    @IsNotEmpty()
    readonly abbrevation: string
    

}