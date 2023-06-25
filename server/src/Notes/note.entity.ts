import { ClassesEntity } from "src/Classes/classes.entity";
import { UserEntity } from "src/User/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("notes")
export class NoteEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number


    @Column()
    note: string

   @Column()
   teacherId : number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

   
    @ManyToOne(() => UserEntity, (user) => user.notes)
    user: UserEntity
}   