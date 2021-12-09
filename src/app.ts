import express from "express";
import questionRouter from './routers/questionRouter';
import { ServerErrorMiddleware } from "./middlewares/serverErrorMiddleware";

const app = express();
app.use(express.json());

app.use('/questions', questionRouter);

app.use(ServerErrorMiddleware)

export default app;
