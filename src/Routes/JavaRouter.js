import { Router } from "express";
import LogsControl from "../Controller/LogsControl.js";

const javaRouter = new Router();

javaRouter.post('/', LogsControl.insert)
.put('/:id', LogsControl.update)
.delete('/:id', LogsControl.delete)
.get('/', LogsControl.consult)
.get('/:id', LogsControl.consult);

export default javaRouter;