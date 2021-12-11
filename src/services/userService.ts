import * as userRepository from '../repositories/userRepository';
import  * as tokenService from './tokenService';
import { User } from '../contracts/UserContract';
import NotFound from '../errors/NotFound';
import UserError from '../errors/UserError';

async function add(name: string, classs: string): Promise<string> {
    const token = tokenService.getUniqueToken();
    
    const user = await userRepository.add(name, classs, token);

    if (!user) {
        throw new UserError('User not added');
    }

    return user.token;
}

async function getByToken(token: string): Promise<User> {
    const user = await userRepository.getOne(token);

    if (!user) {
        throw new NotFound('user not found');
    }
    
    return user;
}

export {
    add,
    getByToken,
}