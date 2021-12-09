import express from "express";

const app = express();
app.use(express.json());

app.get("/status", (req, res) => res.send('heloo'));

export default app;
