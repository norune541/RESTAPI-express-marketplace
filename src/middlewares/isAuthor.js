import { Advert } from "../models/advert.js";
import { ApiError } from "../errors/ApiError.js";

export const isAuthor = async (req, res, next) => {
  try {
    const advert = await Advert.isRight(req.params.id);
    if (!advert) {
      return next(ApiError("Advert not found", 404));
    }
    if (advert.user_id != req.user.id && req.user.role !== "moderator") {
      return next(
        ApiError("Only advert's author or moderator can do this", 403),
      );
    }
    next();
  } catch (err) {
    return next(ApiError(err));
  }
};
