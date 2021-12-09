import { RequestHandler } from 'express';
import * as userValidation from '../validation/userValidation';
import * as userService from '../services/userService';

const add: RequestHandler = async (req, res, next) => {
    const { error } = userValidation.add.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const {
        name,
        classs,
    } = req.body;

    try {
        const token = await userService.add(name, classs);
        
        res.send({ token });
    } catch (error) {
        next(error);
    }
}

export {
    add,
}