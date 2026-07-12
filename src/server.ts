import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/users/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
// import { advertRouter } from "./modules/adverts/advert.route";
import { errorHandler } from "./shared/middlewares/errorHandler";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
// app.use("/api", advertRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/api`);
});
