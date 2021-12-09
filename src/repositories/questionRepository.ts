import connection from '../database';
import Question from '../contracts/QuestionContract';
import { baseQuestionSelectQuery } from './questionHelpers';
import QuestionError from '../errors/QuestionError';

async function add(question: string, student: string, classs: string, tags: string): Promise<Question> {
    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4) RETURNING id
    `, [question, student, classs, tags]);

    const addedQuestion = await getOne(result.rows[0].id);
    return addedQuestion;
}

async function getOne(id: number): Promise<Question> {
    const query = `${baseQuestionSelectQuery} AND questions.id = $1`;
    const result = await connection.query(query, [id]);

    return result.rows[0];
}

export {
    add,
    getOne,
}