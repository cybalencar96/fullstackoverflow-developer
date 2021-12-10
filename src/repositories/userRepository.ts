import connection from "../database";
import User from '../contracts/UserContract';
import NotFound from '../errors/NotFound';
import UserError from '../errors/UserError';

async function add(name: string, classs: string, token: string) {
    const result = await connection.query(`
        INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING *;
    `, [name, classs, token]);

    if (!result.rows[0]) {
        throw new UserError('User not added');
    }
}

async function getOne(token: string): Promise<User> {
    const result = await connection.query(`
        SELECT * FROM users WHERE token = $1
    `, [token]);

    if (!result.rows[0]) {
        throw new NotFound('user not found');
    }

    return result.rows[0];
}

export {
    add,
    getOne,
}