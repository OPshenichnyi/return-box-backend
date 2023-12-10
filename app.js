import express from "express"; // Імпортуємо бібліотеку експресс для створення WEB-SERVER
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();
const app = express(); // Викликаємо express та створюємо SERVER

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

export default app;
