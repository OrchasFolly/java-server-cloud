import { Router } from "express";
import LogsControl from "../Controller/LogsControl.js";

const javaRouter = new Router();

// Definição de endpoints do candidato
javaRouter.post('/java', LogsControl.insert)
.put('/java',LogsControl.update)
.delete('/java',LogsControl.delete)
.get('/java',LogsControl.consult)
.get('/java:key',LogsControl.consult);

export default javaRouter;