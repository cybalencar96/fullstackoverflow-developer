import joi from 'joi';

const post = joi.object({
    question: joi.string().required(),
	student: joi.string().required(),
	classs: joi.string().max(3).required(),
	tags: joi.string().required(),
});

export {
    post,
}