import express from "express";
import questionRouter from './routers/questionRouter';
import { serverErrorMiddleware } from "./middlewares/serverErrorMiddleware";
import * as questionController from './controllers/questionController';

const app = express();
app.use(express.json());

app.use('/questions', questionRouter);

app.use(serverErrorMiddleware)

export default app;
