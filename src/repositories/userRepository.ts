import connection from "../database";

async function add(name: string, classs: string, token: string) {
    await connection.query(`
        INSERT INTO users (name, class, token) VALUES ($1, $2, $3);
    `, [name, classs, token]);
}

export {
    add,
}