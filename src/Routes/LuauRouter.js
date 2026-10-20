import { Router } from "express";
import LuauControl from "../Controller/LuauControl.js";

const luauRouter = new Router();

luauRouter.post('/', LuauControl.insert)
.get('/', LuauControl.consult)
.get('/:id', LuauControl.consult);

export default luauRouter;