import connection from '../database';

async function add(question: string, student: string, classs: string, tags: string ) {
    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags)
    `, [question, student, classs, tags]);

    return result.rows[0];
}

export {
    add,
}