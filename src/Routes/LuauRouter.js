import { Router } from "express";
import LuauControl from "../Controller/LuanControl.js";

const luauRouter = new Router();

// Definição de endpoints do candidato
luauRouter.post('/', LuauControl.insert)
.put('/:id',LuauControl.update)
.delete('/:id',LuauControl.delete)
.get('/',LuauControl.consult)
.get('/:id',LuauControl.consult);

export default luauRouter;