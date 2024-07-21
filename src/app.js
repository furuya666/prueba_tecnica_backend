import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
const app = express();
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Routes
app.use("/api", usersRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
export default app;
