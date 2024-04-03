import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Token from './token.entity'
import Task from './task.entity'
import Phone from './phone.entity'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number // se for diferente no banco colocar na Collumn(nome _correto:tipo)

  @Column({ name: 'names' }) //se for possível ser nulo  colocar {nullable: string}
  name!: string //"!" quando é obrigatório 

  @Column()
  email!: string

  @Column()
  password!: string //colocar criptografia não usar string limpa

  @OneToMany(() => Token, token => token.user)
  tokens?: Token[] //pode ter uma lista ou nada não tem problema ser ? ou !

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[]

  @OneToMany(() => Phone, phone => phone.user)
  phones!: Phone[]
}