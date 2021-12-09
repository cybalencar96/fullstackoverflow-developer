import * as questionRepository from '../repositories/questionRepository';

async function add(question: string, student: string, classs: string, tags: string ): Promise<Number> {
    const addedQuestionFromDb = await questionRepository.add(question, student, classs, tags);

    return addedQuestionFromDb.id;
}

export {
    add,
}