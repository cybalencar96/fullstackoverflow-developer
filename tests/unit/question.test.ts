import * as questionService from '../../src/services/questionService';
import * as questionRepository from '../../src/repositories/questionRepository';
import { Question, QuestionDB, QuestionNotAnswered, QuestionAnswered, AnswerQuestion } from '../../src/contracts/QuestionContract';
import { User } from '../../src/contracts/UserContract';
import * as dateService from '../../src/services/datesService';
import NotFound from '../../src/errors/NotFound';
import * as userService from '../../src/services/userService';

const sut = questionService;

jest.spyOn(dateService, 'convertDate').mockReturnValue('24/12/2021 00:00');

const mockQuestion: Question = {
    question: '',
    student: '',
    classs: '',
    tags: ''
}

const mockAnsweredQuestionDB: QuestionDB = {
    id: 0,
    submitedAt: '',
    answer: 'AlgumaCoisa',
    answeredAt: 'ontem',
    answeredBy: 'eu',
    question: '',
    student: '',
    classs: '',
    tags: ''
}

const mockNotAnsweredQuestionDB: QuestionDB = {
    id: 0,
    submitedAt: '',
    question: '',
    student: '',
    classs: '',
    tags: '',
    answer: '',
    answeredAt: '',
    answeredBy: ''
}

const mockQuestionDB: QuestionDB = {
    id: 0,
    submitedAt: '',
    answer: null,
    answeredAt: null,
    answeredBy: null,
    question: '',
    student: '',
    classs: '',
    tags: ''
}

const mockAnsweredQuestionService: QuestionAnswered = {
    answer: 'AlgumaCoisa',
    answeredAt: '24/12/2021 00:00',
    answeredBy: 'eu',
    question: '',
    student: '',
    class: '',
    tags: '',
    submitAt: '24/12/2021 00:00',
    answered: true
}

const mockNotAnsweredQuestionService: QuestionNotAnswered = {
    question: '',
    student: '',
    class: '',
    tags: '',
    submitAt: '24/12/2021 00:00',
    answered: false
}

const mockUser: User = {
    id: 0,
    name: '',
    class: '',
    token: ''
}

const mockAnswerQuestion: AnswerQuestion = {
    questionId: 0,
    answer: ''
}

describe('Questions unit tests', () => {
    describe('add question service', () => {
        test('should return addedQuestion id', async () => {
            jest.spyOn(questionRepository, 'add').mockImplementationOnce(async () => mockQuestionDB)
    
            const id = await sut.add(mockQuestion);
    
            expect(id).toBe(mockQuestionDB.id);
        });
    })

    describe('getById question service', () => {
        test('should return question answered', async () => {
            jest.spyOn(questionRepository, 'getOne').mockImplementationOnce(async () => mockAnsweredQuestionDB)
    
            const questionAnswered = await sut.getById(0);
    
            expect(questionAnswered).toEqual(mockAnsweredQuestionService);
        });
    
        test('should return question not answered', async () => {
            jest.spyOn(questionRepository, 'getOne').mockImplementationOnce(async () => mockNotAnsweredQuestionDB)
    
            const questionAnswered = await sut.getById(0);
            
            expect(questionAnswered).toEqual(mockNotAnsweredQuestionService);
        });
    
        test('should throw NotFound error', async () => {
            jest.spyOn(questionRepository, 'getOne').mockImplementationOnce(async () => undefined)
    
            const promise = sut.getById(0);
            
            await expect(promise).rejects.toThrowError(NotFound);
        });
    });
    
    describe('answerQuestion question service', () => {
        test('should return true when question answered', async () => {
            jest.spyOn(userService, 'getByToken').mockImplementationOnce(async () => mockUser);
            jest.spyOn(questionRepository, 'answer').mockImplementationOnce(async () => true);
            jest.spyOn(questionRepository, 'getOne').mockImplementationOnce(async () => mockQuestionDB);
    
            const result = await sut.answerQuestion(mockAnswerQuestion);
    
            expect(result).toBeTruthy();
        });

        test('should throw NotFound error when question not found', async () => {
            jest.spyOn(userService, 'getByToken').mockImplementationOnce(async () => mockUser);
            jest.spyOn(questionRepository, 'answer').mockImplementationOnce(async () => true);
            jest.spyOn(questionRepository, 'getOne').mockImplementationOnce(async () => undefined);
    
            const promise = sut.answerQuestion(mockAnswerQuestion);
    
            await expect(promise).rejects.toThrowError(NotFound);
        });
    });

    describe('getNotAnswereds question service', () => {
        test('should return array with not answered questions', async () => {
            jest.spyOn(questionRepository, 'getMany').mockImplementationOnce(async () => [mockQuestionDB, mockQuestionDB]);

            const result = await sut.getNotAnswered();

            const mockNotAnswereds: QuestionNotAnswered = {
                id: 0,
                question: '',
                student: '',
                class: '',
                submitAt: '24/12/2021 00:00'
            }

            expect(result).toEqual([mockNotAnswereds, mockNotAnswereds])
        });
    });
});
