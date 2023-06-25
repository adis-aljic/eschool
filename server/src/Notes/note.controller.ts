import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";

import { NoteService } from "./note.service";
import { NoteDTO } from "./DTO/note.dto";
import { DeleteNoteDTO } from "./DTO/deleteNote.dto";
@Controller()
export class NoteController {
constructor(private readonly noteService : NoteService){}

@Post("api/note/add")
async addNote(@Body() noteDTO :NoteDTO ){
    return this.noteService.addNote(noteDTO)
    // return gradeDTO
    
}
@Post("api/note/delete")
async deleteNote(@Body( "noteId") noteId : number) {
    console.log(noteId);
    
    return this.noteService.deleteNote(noteId)
}
}