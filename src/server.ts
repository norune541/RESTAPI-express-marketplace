import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.controller";
import { userRouter } from "./modules/users/user.controller";
import { advertRouter } from "./modules/adverts/advert.route";
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
