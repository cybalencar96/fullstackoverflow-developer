import { v4 as uuid } from 'uuid';

function getUniqueToken(): string {
    const token = uuid();

    return token; 
}

export {
    getUniqueToken,
}