import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Phone extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    number!: number

    @ManyToOne(() => User, user => user.phones)
    user!: User
}