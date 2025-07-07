import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from './src/presentation/routes/TodoRoutes.js';
import responseTimeMiddleware from "./src/infrastructure/middlewares/responseTimeMiddleware.js";
import loggingMiddleware from "./src/infrastructure/middlewares/loggingMiddleware.js";

dotenv.config();

const app = express();

app.use(loggingMiddleware);

app.use(responseTimeMiddleware);

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


