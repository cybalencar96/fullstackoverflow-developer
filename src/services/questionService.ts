import { boolean } from 'joi';
import * as questionRepository from '../repositories/questionRepository';

async function add(question: string, student: string, classs: string, tags: string ): Promise<Number> {
    const addedQuestionFromDb = await questionRepository.add(question, student, classs, tags);

    return addedQuestionFromDb.id;
}

async function getById(id: number) {
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

/* async function answerQuestion(questionId: number, answer: string, userToken: string) {
    await questionRepository.answerQuestion(questionId, answer)
} */


export {
    add,
    getById,
}