import { Test } from "@nestjs/testing";
import { NoteService } from "./note.service";

const noteDTO = {
    id : 1,
    studentId : 2,
    teacherId: 1
}
const mockNoteRepository = () => {
{    addNote : jest.fn()
}}

describe("NoteService", ()=>{
let noteRepository;
let userRepository;

beforeEach(async()=>{
    const module = Test.createTestingModule({
        providers : [NoteService, {provide : noteRepository, useFactory : mockNoteRepository}]
    }).compile()
    

})




})