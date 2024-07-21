import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    login,
    updateUser,
} from "../controllers/users.controller.js";

const router = Router();

// GET all Employees
router.get("/users", getUsers);

// GET An Employee
router.get("/users/:id", getUser);

// DELETE An Employee
router.delete("/users/:id", deleteUser);

// INSERT An Employee
router.post("/users", createUser);

router.post("/login", login);

router.patch("/users/:id", updateUser);
export default router;
