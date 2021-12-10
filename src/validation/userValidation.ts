import joi from 'joi';

const add = joi.object({
    name: joi.string().required(),
    class: joi.string().max(3).required(),
});

export {
    add,
}