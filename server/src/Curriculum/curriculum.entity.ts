
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "curriculum" })
export class CurriculumEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    classCode: string

    @Column()
    curriculum: string

    @ManyToOne(() => UserEntity, (user) => user.curriculum)
    user: UserEntity

}