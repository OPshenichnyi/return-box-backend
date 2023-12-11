import express from "express"; // Імпортуємо бібліотеку експресс для створення WEB-SERVER
import "dotenv/config";
import logger from "morgan";

import authRouter from "./routes/auth-routers.js";

const app = express(); // Викликаємо express та створюємо SERVER

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

export default app;
