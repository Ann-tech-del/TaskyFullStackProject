import { Request, Response } from "express";


import { client } from "../config/prismaConfig";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const allTasks = await client.task.findMany({
      where: {
        isDeleted: false,
        userId: userId,
      },
      orderBy: {
        dateCreated: 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json({ allTasks });
  } catch (_e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getSpecificTask = async (req: Request, res: Response) => {
  const { TaskId } = req.params;
  try {
    const tasks = await client.task.findFirst({
      where: {
        AND: [{ id: TaskId }, { isDeleted: false }],
      },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    if (!tasks) {
      res.status(404).json({ message: "Not found." });
      return;
    }
    res.status(200).json({ message: "Fetched blog successfully", tasks });
  } catch (_e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

 const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Delete request for task id:', id);
  try {
    const exists = await client.task.findFirst({
      where: {
        AND: [{ id: id }, { isDeleted: false }],
      },
    });
    console.log('Task found:', exists);
    if (!exists) {
      res.status(404).json({ message: "Not found." });
      return;
    }
    const deletedTask = await client.task.update({
      where: { id: id },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.error('Delete task error:', e);
    res.status(500).json({ message: "Something went wrong." });
  }
};

async function updateTask(req: Request, res: Response) {
  try {
    const { id: taskId } = req.params;
    const { title, description } = req.body;
    const { id: userId } = req.user;
    const existingTask = await client.task.findFirst({
      where: {
        id: taskId,
         userId : userId,
        isDeleted: false
      }
    });
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found or you don't have permission to edit it"
      });
    }
    const updatedTask = await client.task.update({
      where: { id: taskId },
      data: {
        title: title || undefined,
        description: description || undefined,
        
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true
          }
        }
      }
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


 const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id } = req.user;
  try {
    const newTask = await client.task.create({
      data: { title, description, userId: id },
    });
    res
      .status(201)
      .json({ message: "Task created successfully.", blog: newTask });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

 const getUserSpecificBlogs = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await client.user.findFirst({
      where: { username },
    });
    if (!user) {
      res.status(404).json({ message: `User ${username} not found.` });
      return;
    }

    const userTasks = await client.task.findMany({
      where: {
        AND: [{ userId: user.id }, { isDeleted: false }],
      },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            dateJoined: true,
          },
        },
      },
    });

    res.status(200).json({ userTasks });
  } catch (_e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const markTaskAsComplete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await client.task.update({
      where: { id },
      data: { isCompleted: true },
    });
    res.status(200).json({ message: "Task marked as complete", task: updatedTask });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const markTaskAsIncomplete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTask = await client.task.update({
      where: { id },
      data: { isCompleted: false },
    });
    res.status(200).json({ message: "Task marked as incomplete", task: updatedTask });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export {getAllTasks,getSpecificTask,createTask,deleteTask,updateTask,getUserSpecificBlogs,markTaskAsComplete,markTaskAsIncomplete}