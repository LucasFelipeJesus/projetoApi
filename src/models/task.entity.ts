import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column({default: false})
    completed!: boolean
}