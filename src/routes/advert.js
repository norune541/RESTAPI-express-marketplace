import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { isAuthor } from "../middlewares/isAuthor.js";
import {
  getAdvertsByUserId,
  getCategories,
  getAdvertByAdvertId,
  updateStatus,
  deleteAdvert,
  updateAdvert,
} from "../controllers/advert.js";

export const advertRouter = Router();

advertRouter.get("/user/adverts", auth, getAdvertsByUserId);
advertRouter.get("/categories", getCategories);
advertRouter.get("/adverts/:id", auth, getAdvertByAdvertId);
advertRouter.delete("/adverts/:id", auth, isAuthor, deleteAdvert);
advertRouter.post("/adverts/:id/update-status", auth, isAuthor, updateStatus);
advertRouter.patch("/adverts/:id", auth, isAuthor, updateAdvert);
