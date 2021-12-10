import connection from '../database';
import { Question, QuestionDB, AnswerQuestion } from '../contracts/QuestionContract';
import { baseQuestionSelectQuery } from './questionHelpers';
import NotFound from '../errors/NotFound';
import QuestionError from '../errors/QuestionError';

interface FiltersGetMany {
    answered?: boolean;
}


async function add(questionToAdd: Question): Promise<QuestionDB> {
    const {
        question,
        student,
        classs,
        tags,
    } = questionToAdd;

    const result = await connection.query(`
        INSERT INTO questions (question, student, classs, tags) VALUES ($1, $2, $3, $4) RETURNING id
    `, [question, student, classs, tags]);

    if (!result.rows[0]) {
        throw new QuestionError('Question not added');
    }

    const addedQuestion = await getOne(result.rows[0].id);
    return addedQuestion;
}

async function getOne(id: number): Promise<QuestionDB> {
    const query = `${baseQuestionSelectQuery} AND questions.id = $1`;
    const result = await connection.query(query, [id]);

    if (!result.rows[0]) {
        throw new NotFound('question not found');
    }

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

async function answer(answerInfo: AnswerQuestion) {
    const {
        questionId,
        answer,
        userId,
    } = answerInfo;

    const question = await connection.query('SELECT * FROM questions WHERE id = $1', [questionId]);

    if (!question.rows[0]) {
        throw new NotFound('question not found')
    }

    await connection.query(`
        UPDATE questions 
        SET 
            answer = $1, 
            "answeredBy" = $2, 
            "answeredAt" = NOW()
        WHERE
            id = $3;
    `, [answer, userId, questionId]);
}

export {
    add,
    getOne,
    answer,
    getMany,
}