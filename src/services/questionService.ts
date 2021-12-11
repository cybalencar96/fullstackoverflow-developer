import * as questionRepository from '../repositories/questionRepository';
import * as userService from './userService';
import { Question, QuestionAnswered, QuestionNotAnswered, AnswerQuestion } from '../contracts/QuestionContract';
import { convertDate } from './datesService';
import NotFound from '../errors/NotFound';

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
    const questionRepo = await questionRepository.getOne(id);

    if (!questionRepo) {
        throw new NotFound('question not found');
    }

    const { answeredAt } = questionRepo;

    const structuredQuestion: QuestionAnswered | QuestionNotAnswered = Object.assign({},
        { 
            question: questionRepo.question,
            student: questionRepo.student,
            class: questionRepo.classs,
            tags: questionRepo.tags,
            answered: !!questionRepo.answeredAt,
            submitAt: convertDate(questionRepo.submitedAt),
        },
        answeredAt ? { answeredAt: convertDate(answeredAt) } : null,
        answeredAt ? { answeredBy: questionRepo.answeredBy } : null,
        answeredAt ? { answer: questionRepo.answer } : null,
      );

    return structuredQuestion;
}

async function answerQuestion(answerInfo: AnswerQuestion): Promise<Boolean> {
    const {
        questionId,
        answer,
        userToken,
    } = answerInfo;

    const user = await userService.getByToken(userToken);
    const question = await questionRepository.getOne(questionId);

    if (!question) {
        throw new NotFound("Tried to update question that doens't exists")
    }

    await questionRepository.answer({ questionId, answer, userId: user.id });

    return true;
}

async function getNotAnswered(): Promise<QuestionNotAnswered[]> {
    const questions = await questionRepository.getMany({ answered: false });

    const structuredQuestions = questions.map(question => {
        return {
            id: question.id,
            question: question.question,
            student: question.student,
            class: question.classs,
            submitAt: convertDate(question.submitedAt),
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