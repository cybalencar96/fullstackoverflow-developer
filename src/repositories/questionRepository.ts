import connection from '../database';

async function add(question: string, student: string, classs: string, tags: string ) {
    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4) RETURNING id;
    `, [question, student, classs, tags]);

    return result.rows[0];
}

export {
    add,
}