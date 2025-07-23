import { Router } from "express";
const taskRouter = Router()
 import { createTask, deleteTask, getSpecificTask, updateTask, getAllTasks, markTaskAsComplete, markTaskAsIncomplete } from "../controller/tasks.controller";
 import verifyUser from "../mildware/verifyUser";
taskRouter.post("/tasks", verifyUser,createTask)
taskRouter.get("/tasks", verifyUser,getAllTasks);
taskRouter.get("/tasks/:id",verifyUser, getSpecificTask)

taskRouter.put("/tasks/:id", verifyUser, updateTask)

taskRouter.delete("/tasks/:id", verifyUser, deleteTask)
taskRouter.patch("/tasks/:id/complete", verifyUser, markTaskAsComplete);
taskRouter.patch("/tasks/:id/incomplete", verifyUser, markTaskAsIncomplete);
 


export default taskRouter;