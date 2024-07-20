import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_WORD = process.env.COOKIE_WORD;
const COOKIE_PARSER_WORD = process.env.COOKIE_PARSER_WORD;

export const options = {
    PORT,
    DATABASE_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    COOKIE_WORD,
    COOKIE_PARSER_WORD,
}