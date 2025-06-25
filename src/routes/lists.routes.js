import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { addProblemToList, createList, deleteList, getAllLists, getListDetails, removeProblemFromList, updateList } from "../controllers/list.controller.js";

const listRouter = Router();

listRouter.get('/', verifyAuth, getAllLists);

listRouter.get('/getList/:id', verifyAuth, getListDetails);

listRouter.post('/create', verifyAuth, createList);

listRouter.put('/update/:id', verifyAuth, updateList);

listRouter.post('/add/:id/', verifyAuth, addProblemToList);

listRouter.delete('/remove/:id', verifyAuth, removeProblemFromList);

listRouter.delete('/:id', verifyAuth, deleteList);


export default listRouter;
