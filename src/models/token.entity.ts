import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity()
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  token!: string

  @Column()
  refreshToken!: string

  @Column()
  expiresAt!: Date  //data para expirar o token

  @Column()
  userId!: number

  @ManyToOne(() => User, user => user.tokens)   //relacionamento - vários tokens para vários usuários
  user!: User
}