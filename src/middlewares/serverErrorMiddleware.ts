import { ErrorRequestHandler } from "express";

export const serverErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
} 