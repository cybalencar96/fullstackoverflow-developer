import { ErrorRequestHandler } from "express";

export const ServerErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
} 