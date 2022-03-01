import "reflect-metadata";
import express from "express";
import "./database";
import helmet from "helmet";
import { routes } from "./routes";

const app = express();
app.use(helmet());
app.use(express.json());

app.use(routes);

export default app;
