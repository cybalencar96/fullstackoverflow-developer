import * as userRepository from '../repositories/userRepository';
import  * as tokenService from './tokenService';

async function add(name: string, classs: string): Promise<string> {
    const token = tokenService.getUniqueToken();
    
    await userRepository.add(name, classs, token);

    return token;
}

export {
    add,
}