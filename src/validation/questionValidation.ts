import joi from 'joi';

const post = joi.object({
    question: joi.string().required(),
	student: joi.string().required(),
	class: joi.string().max(3).required(),
	tags: joi.string().required(),
});

const postAnswer = joi.object({
    answer: joi.string().required(),
});

export {
    post,
	postAnswer,
}