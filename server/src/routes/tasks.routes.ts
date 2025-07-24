import { Router } from "express";
const taskRouter = Router()
 import { createTask, deleteTask, getSpecificTask, updateTask, getAllTasks, markTaskAsComplete, markTaskAsIncomplete,restoreTask, getTrashTasks } from "../controller/tasks.controller";
 import verifyUser from "../mildware/verifyUser";
taskRouter.post("/tasks", verifyUser,createTask)
taskRouter.get("/tasks", verifyUser,getAllTasks);
taskRouter.get("/tasks/trash", verifyUser, getTrashTasks);
taskRouter.get("/tasks/:id",verifyUser, getSpecificTask)

taskRouter.put("/tasks/:id", verifyUser, updateTask)

taskRouter.delete("/tasks/:id", verifyUser, deleteTask)
taskRouter.patch("/tasks/:id/complete", verifyUser, markTaskAsComplete);
taskRouter.patch("/tasks/:id/incomplete", verifyUser, markTaskAsIncomplete);
 taskRouter.patch("/tasks/restore/:id",verifyUser,restoreTask)
 taskRouter.patch("/tasks/:id/restore", verifyUser, restoreTask);


export default taskRouter;