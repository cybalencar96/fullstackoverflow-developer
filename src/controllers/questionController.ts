import { RequestHandler } from 'express';
import * as questionValidation from '../validation/questionValidation';
import * as questionService from '../services/questionService';

const postQuestion: RequestHandler = async (req, res, next) => {
    const { error } = questionValidation.post.validate(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const {
        question,
	    student,
	    tags,
    } = req.body;

    try {
        const addedQuestionId = await questionService.add({ question, student, classs: req.body.class, tags });

        res.status(200).send({ id: addedQuestionId });
    } catch (error) {
        next(error);
    }
}

const getQuestion: RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).send('Id is mandatory and must be a number');
    }

    try {
        const question = await questionService.getById(id);

        res.send(question);
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(404).send(error.message);
        }

        next(error);
    }
}

const answerQuestion: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const id = Number(req.params.id);
    const { answer } = req.body;

    if (!token || token.length !== 36) {
        return res.status(401);
    }

    if (!id) {
        return res.status(400).send('Id is mandatory and must be a number');
    }

    const { error } = questionValidation.postAnswer.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await questionService.answerQuestion({ questionId: id, answer, userToken: token });
        
        res.status(204).send();
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(404).send(error.message);
        }

        next(error);
    }
}

const getNotAnswered: RequestHandler = async (req, res, next) => {
    try {
        const questions = await questionService.getNotAnswered();

        if (!questions.length) {
            return res.status(204).send(questions);
        }

        res.send(questions);
    } catch (error) {
        next(error);
    }
}

export {
    postQuestion,
    getQuestion,
    answerQuestion,
    getNotAnswered,
}
