// importamos el módulo express
import express from "express";
//     importamos dotenv
import dotenv from "dotenv";
// importamos morgan
import logger from "morgan";
// importamos accountRouter
import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";

// Añadimos el método config de dotenv
dotenv.config();


const expressApp = express();

// middlewares para interpretar el formato json y text enviados desde el cliente por http
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger("dev"));
// middleware que hemos importado del router accountRouter
expressApp.use("/account", accountRouter);
// middleware que hemos importado del router authRouter
expressApp.use("/auth", authRouter);

