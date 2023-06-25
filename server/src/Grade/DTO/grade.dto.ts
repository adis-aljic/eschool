import { IsNotEmpty } from "class-validator"

export class GradeDTO {

    @IsNotEmpty()
    readonly grade: number

    @IsNotEmpty()
    readonly studentId: number

    @IsNotEmpty()
    readonly teacherId : number




}