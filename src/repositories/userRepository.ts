import connection from "../database";
import User from '../contracts/UserContract';
import NotFound from '../errors/NotFound';

async function add(name: string, classs: string, token: string) {
    await connection.query(`
        INSERT INTO users (name, class, token) VALUES ($1, $2, $3);
    `, [name, classs, token]);
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