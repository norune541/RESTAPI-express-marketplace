import { ApiError } from "../errors/ApiError.js";
import { Advert } from "../models/advert.js";

export const getAdvertsByUserId = async (req, res) => {
  const { status = "published" } = req.query;
  const adverts = await Advert.getAdvertsByUserId(status, req.user.id);
  return res.status(200).json(adverts);
};

export const getCategories = async (req, res) => {
  const categories = await Advert.categories();
  return res.status(200).json(categories);
};

export const getAdvertByAdvertId = async (req, res, next) => {
  const { id } = req.params;
  const advert = await Advert.getAdvertsByAdvertId(id, req.user.id);
  if (!advert) {
    return next(ApiError("Advert not found", 404));
  }
  return res.status(200).json(advert);
};

export const deleteAdvert = async (req, res, next) => {
  const advert = Advert.deleteAdvert(req.user.id);
  return res.sendStatus(204);
};

export const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const id = Number(req.params.id);

  if (!status) {
    return next(ApiError("Status field is empty", 422));
  }
  console.log(status);
  if (
    status !== "publshed" &&
    status !== "draft" &&
    status !== "moderation" &&
    status !== "declined" &&
    status !== "archived"
  ) {
    return next(ApiError("Invalid status format", 422));
  }

  const advert = await Advert.updateStatus(status, id, req.user.id);
  if (advert.affectedRows === 0) {
    return next(ApiError("Advert not found", 404));
  }
  const newAdvert = await Advert.getAdvertsByAdvertId(id, req.user.id);

  return res.status(200).json(newAdvert);
};

export const updateAdvert = async (req, res, next) => {
  const { ...payload } = req.body;
  const { id } = req.params;
  const advert = await Advert.updateAdvert(payload, id, req.user.id);
  if (advert.affectedRows === 0) {
    return next(ApiError("Advert not found", 404));
  }
  const newAdvert = await Advert.getAdvertsByAdvertId(id, req.user.id);

  return res.status(200).json(newAdvert);
};
