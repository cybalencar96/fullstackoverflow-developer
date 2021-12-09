import joi from 'joi';

const add = joi.object({
    name: joi.string().required(),
    classs: joi.string().max(3).required(),
});

export {
    add,
}