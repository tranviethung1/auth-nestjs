
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role;
}
// id: 2,
// username: 'maria',
// email: 'maria@gmail.com',
// password: 'guess',