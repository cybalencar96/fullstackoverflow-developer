import { ErrorRequestHandler } from "express";

export const serverErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'SyntaxError') {
        return res.status(400).send('Bad JSON structure');
    }
    
    console.log(err);
    res.sendStatus(500);
} 