import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserEntity } from "src/User/user.entity";
import { NoteDTO } from "./DTO/note.dto";
import { NoteEntity } from "./note.entity";
import { DeleteNoteDTO } from "./DTO/deleteNote.dto";

@Injectable()
export class NoteService {

constructor(@InjectRepository(NoteEntity) private readonly noteRepository : Repository<NoteEntity>, 
@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity> ) {}

async addNote(noteDTO : NoteDTO) : Promise <any> {
    console.log(noteDTO);
    const student = await this.userRepository.findOneBy({id : noteDTO.studentId})
    const newNote = new NoteEntity()
    newNote.note = noteDTO.note
    newNote.teacherId = noteDTO.teacherId
    newNote.user = student
    console.log(student);
    console.log(newNote);

     await this.noteRepository.save(newNote)
     throw new HttpException("Note is added" , HttpStatus.OK)        

    
    
    }
    async deleteNote(noteId : number){

        const note = await this.noteRepository.findOne({
            where: {
                id : noteId,
               
            }
        })
        if(!note) {
            throw new HttpException("Note is not found!" , HttpStatus.BAD_REQUEST)
            
        }

        await this.noteRepository.delete({
            id: note.id
        })
       
        throw new HttpException("Note is deleted" , HttpStatus.OK)        
        
    }

}