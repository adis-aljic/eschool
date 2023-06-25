import {
    BaseEntity, Entity, PrimaryGeneratedColumn, Column,
    BeforeInsert, OneToMany, JoinTable, ManyToMany
} from "typeorm";
import { hash } from "bcrypt"
import { ClassesEntity } from "src/Classes/classes.entity";
import { NewsEntity } from "src/News/news.entity";
import { CurriculumEntity } from "src/Curriculum/curriculum.entity";
import { GradeEntity } from "src/Grade/grade.entity";
import { NoteEntity } from "src/Notes/note.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: "teacher" })
    role: string;

    @Column({ default: false })
    isAuth: boolean


    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }

    @ManyToMany(() => NewsEntity, (news) => news.user, {cascade:true})
    news: NewsEntity[]

    @ManyToMany(() => ClassesEntity, (classes) => classes.user , {cascade:true})
    classes: ClassesEntity[]
    // @OneToMany(() => ClassesEntity, (classes) => classes.user)
    // classes: ClassesEntity[]

    @OneToMany(() => CurriculumEntity, (curriculum) => curriculum.user, {cascade:true})
    curriculum: CurriculumEntity[]

    @OneToMany(() => GradeEntity, (grades) => grades.user, {cascade:true})
    grades: GradeEntity[]
    
    @OneToMany(() => NoteEntity, (note) => note.user, {cascade:true})
    notes: NoteEntity[]

}