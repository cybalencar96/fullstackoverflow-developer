import connection from '../database';
import { Question, QuestionDB, AnswerQuestion } from '../contracts/QuestionContract';
import { baseQuestionSelectQuery } from './questionHelpers';
import QuestionError from '../errors/QuestionError';

async function add(questionToAdd: Question): Promise<QuestionDB> {
    const {
        question,
        student,
        classs,
        tags,
    } = questionToAdd;

    const result = await connection.query(`
        INSERT INTO questions (question, student, class, tags) VALUES ($1, $2, $3, $4) RETURNING id
    `, [question, student, classs, tags]);

    const addedQuestion = await getOne(result.rows[0].id);
    return addedQuestion;
}

async function getOne(id: number): Promise<QuestionDB> {
    const query = `${baseQuestionSelectQuery} AND questions.id = $1`;
    const result = await connection.query(query, [id]);

    return result.rows[0];
}

async function answer(answerInfo: AnswerQuestion) {
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
}

export {
    add,
    getOne,
    answer,
}