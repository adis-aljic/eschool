import { IsNotEmpty } from "class-validator"

export class NoteDTO {

    @IsNotEmpty()
    readonly note: string

    @IsNotEmpty()
    readonly studentId: number

    @IsNotEmpty()
    readonly teacherId : number




}