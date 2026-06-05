import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { advertRouter } from "./routes/advert";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", advertRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
