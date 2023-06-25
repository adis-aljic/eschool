import { ClassesEntity } from "src/Classes/classes.entity";
import { UserEntity } from "src/User/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("grades")
export class GradeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number


    @Column()
    grade: number

   @Column()
   teacherId : number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

   
    @ManyToOne(() => UserEntity, (user) => user.grades)
    user: UserEntity
}   