import connection from '../database';
import { Question, QuestionDB, AnswerQuestion } from '../contracts/QuestionContract';
import { baseQuestionSelectQuery } from './questionHelpers';
import NotFound from '../errors/NotFound';
import QuestionError from '../errors/QuestionError';

interface FiltersGetMany {
    answered?: boolean;
}


async function add(questionToAdd: Question): Promise<Number> {
    const {
        question,
        student,
        classs,
        tags,
    } = questionToAdd;

    const result = await connection.query(`
        INSERT INTO questions (question, student, classs, tags) VALUES ($1, $2, $3, $4) RETURNING id
    `, [question, student, classs, tags]);

    return result.rows[0].id;
}

async function getOne(id: number): Promise<QuestionDB> {
    const query = `${baseQuestionSelectQuery} AND questions.id = $1`;
    const result = await connection.query(query, [id]);

    return result.rows[0];
}

async function getMany(filters: FiltersGetMany = {}): Promise<QuestionDB[]> {
    const  {
        answered,
    } = filters;

    let query = baseQuestionSelectQuery;

    if (answered === false) {
        query += ' AND questions."answeredAt" IS NULL'
    }

    if (answered === true) {
        query += ' AND questions."answeredAt" IS NOT NULL'
    }

    const result = await connection.query(query,[]);

    return result.rows;
}

async function answer(answerInfo: AnswerQuestion): Promise<Boolean> {
    const {
        questionId,
        answer,
        userId,
    } = answerInfo;

    await connection.query(`
        UPDATE questions 
        SET 
            answer = $1, 
            "answeredBy" = $2, 
            "answeredAt" = NOW()
        WHERE
            id = $3;
    `, [answer, userId, questionId]);

    return true;
}

export {
    add,
    getOne,
    answer,
    getMany,
}