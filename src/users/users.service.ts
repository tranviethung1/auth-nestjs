import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
const bcrypt = require('bcrypt');
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<User>,
    ) {}
    async findOne(email: string): Promise<UserEntity | undefined> {
         return this.usersRepository.findOne( { where: {email: email } });
        // return this.users.find(user => user.username === username);
    }

    hashPassword(password: string): Observable <string> {
        return from<string>(bcrypt.hash(password, 12));
    }
    // findAll(): Promise<User[]> {
    //     return this.usersRepository.find();
    //   }
      
    // async remove(id: string): Promise<void> {
    //     await this.usersRepository.delete(id);
    //   }

    // create(user: User): Observable<User> {
    //     return this.authService.hashPassword(user.password).pipe(
    //         switchMap((passwordHash: string) => {
    //             const newUser = new UserEntity();
    //             newUser.name = user.name;
    //             newUser.username = user.username;
    //             newUser.email = user.email;
    //             newUser.password = passwordHash;
    //             newUser.role = UserRole.USER;

    //             return from(this.userRepository.save(newUser)).pipe(
    //                 map((user: User) => {
    //                     const {password, ...result} = user;
    //                     return result;
    //                 }),
    //                 catchError(err => throwError(err))
    //             )
    //         })
    //     )
    // }

}