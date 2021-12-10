import * as userRepository from '../repositories/userRepository';
import  * as tokenService from './tokenService';
import User from '../contracts/UserContract';

async function add(name: string, classs: string): Promise<string> {
    const token = tokenService.getUniqueToken();
    
    await userRepository.add(name, classs, token);

    return token;
}

async function getByToken(token: string): Promise<User> {
    const user = userRepository.getOne(token);
    
    await userRepository.getOne(token);

    return user;
}

export {
    add,
    getByToken,
}