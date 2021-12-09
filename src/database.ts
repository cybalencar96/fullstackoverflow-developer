import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
});

export default connection;
