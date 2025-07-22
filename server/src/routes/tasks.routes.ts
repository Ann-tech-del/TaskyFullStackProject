import { Router } from "express";
const taskRouter = Router()
 import { createTask, deleteTask, getSpecificTask, updateTask, getAllTasks } from "../controller/tasks.controller";
 import verifyUser from "../mildware/verifyUser";
taskRouter.post("/tasks", verifyUser,createTask)
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getSpecificTask)

taskRouter.put("/tasks/:id", verifyUser, updateTask)

taskRouter.delete("/tasks/:id", verifyUser, deleteTask)
 


export default taskRouter;