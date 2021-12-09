import { RequestHandler } from 'express';
import * as questionValidation from '../validation/questionValidation';
import * as questionService from '../services/questionService';

const postQuestion: RequestHandler = async (req, res, next) => {
    const { error } = questionValidation.post.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const {
        question,
	    student,
	    classs,
	    tags,
    } = req.body;

    try {
        const addedQuestionId = await questionService.add(question, student, classs, tags);

        res.status(200).send({ id: addedQuestionId });
    } catch (error) {
        next(error);
    }
}

const getQuestion: RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!id) {
        res.status(400).send('Id is mandatory and must be a number');
    }

    try {
        const question = await questionService.getById(id);

        res.send(question);
    } catch (error) {
        next(error);
    }
}

export {
    postQuestion,
    getQuestion,
}