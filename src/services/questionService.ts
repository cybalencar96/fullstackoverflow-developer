import { boolean } from 'joi';
import * as questionRepository from '../repositories/questionRepository';
import * as userService from './userService';
import { Question, QuestionAnswered, QuestionNotAnswered, AnswerQuestion } from '../contracts/QuestionContract';



async function add(questionToAdd: Question): Promise<Number> {
    const {
        question,
        student,
        classs,
        tags
    } = questionToAdd;

    const addedQuestionFromDb = await questionRepository.add({ question, student, classs, tags });

    return addedQuestionFromDb.id;
}

async function getById(id: number): Promise<QuestionAnswered | QuestionNotAnswered>   {
    const question = await questionRepository.getOne(id);
    
    const structuredQuestion = { 
        ...question,
        answered: true, 
    };

    delete structuredQuestion.id;

    if (!question.answer) {
        delete structuredQuestion.answer;
        delete structuredQuestion.answeredAt;
        delete structuredQuestion.answeredBy;
        structuredQuestion.answered = false;
    }

    return structuredQuestion;
}

async function answerQuestion(answerInfo: AnswerQuestion) {
    const {
        questionId,
        answer,
        userToken,
    } = answerInfo;

    const user = await userService.getByToken(userToken);

    await questionRepository.answer({ questionId, answer, userId: user.id });
}


export {
    add,
    getById,
    answerQuestion,
}