import { IsNotEmpty } from "class-validator"

export class DeleteNoteDTO {

    
    @IsNotEmpty()
    readonly noteId : number




}