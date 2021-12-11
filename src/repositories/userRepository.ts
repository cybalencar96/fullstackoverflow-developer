import connection from "../database";
import { User } from '../contracts/UserContract';
import NotFound from '../errors/NotFound';
import UserError from '../errors/UserError';

async function add(name: string, classs: string, token: string): Promise<User> {
    const result = await connection.query(`
        INSERT INTO users (name, class, token) VALUES ($1, $2, $3) RETURNING *;
    `, [name, classs, token]);

    return result.rows[0];
}

async function getOne(token: string): Promise<User> {
    const result = await connection.query(`
        SELECT * FROM users WHERE token = $1
    `, [token]);

    return result.rows[0];
}

export {
    add,
    getOne,
}