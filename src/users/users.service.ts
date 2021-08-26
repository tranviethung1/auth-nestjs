import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
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
    async login(email : string, password : string): Promise<UserEntity | undefined> {
        const users = await this.findOneByEmail(email);
        if (users) {
            const isMatch  = await bcrypt.compare(password, users.password);
            if (isMatch) return users
        }
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOne( { where: {email: email } });
    }


    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcrypt.compare(newPassword, passwortHash));
    }

    hashPassword(password: string): Observable <string> {
        return bcrypt.hash(password, 12);
    }
    // findAll(): Promise<User[]> {
    //     return this.usersRepository.find();
    //   }
      
    // async remove(id: string): Promise<void> {
    //     await this.usersRepository.delete(id);
    //   }

    create(user: User): Observable<User> {
        return this.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;

                return from(this.usersRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

}