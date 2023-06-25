import { IsNotEmpty } from "class-validator"

export class CurriculumDTO {

    @IsNotEmpty()
    readonly classCode: string

    @IsNotEmpty()
    readonly curriculum: string

    @IsNotEmpty()
    readonly userId: number


}