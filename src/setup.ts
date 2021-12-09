import dotenv from "dotenv";

const path = process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev';

dotenv.config({ path });
