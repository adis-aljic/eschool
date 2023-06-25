import { IsNotEmpty } from "class-validator"

export class DeleteGradeDTO {

    @IsNotEmpty()
    readonly grade: number

    @IsNotEmpty()
    readonly studentId: number

  




}