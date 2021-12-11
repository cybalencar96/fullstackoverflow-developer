import { v4 as uuid } from 'uuid';

function getUniqueToken(): string {
    const token = uuid();

    if (!token) {
        throw new Error('token was not created');
    }

    return token; 
}

export {
    getUniqueToken,
}