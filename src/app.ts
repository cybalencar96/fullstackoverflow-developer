import express from "express";
import questionRouter from './routers/questionRouter';
import userRouter from './routers/userRouter';
import { serverErrorMiddleware } from "./middlewares/serverErrorMiddleware";

const app = express();
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/users', userRouter);

app.use(serverErrorMiddleware)

export default app;
