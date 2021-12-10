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
    const {
        question,
        student,
        classs,
        tags,
        submitedAt,
        answeredAt,
        answeredBy,
        answer
    } = await questionRepository.getOne(id);

    const structuredQuestion: QuestionAnswered | QuestionNotAnswered = Object.assign({},
        { 
            question,
            student,
            class: classs,
            tags,
            answered: !!answeredAt,
            submitAt: submitedAt,
        },
        answeredAt ? { answeredAt } : null,
        answeredAt ? { answeredBy } : null,
        answeredAt ? { answer } : null,
      );

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

async function getNotAnswered(): Promise<QuestionNotAnswered[]> {
    const questions = await questionRepository.getMany({ answered: false });

    const structuredQuestions = questions.map(question => {
        return {
            id: question.id,
            question: question.question,
            student: question.student,
            class: question.classs,
            submitAt: question.submitedAt,
        };
    })

    return structuredQuestions;
}


export {
    add,
    getById,
    answerQuestion,
    getNotAnswered,
}