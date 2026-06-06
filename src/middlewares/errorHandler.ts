export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(401).json({ error: "This fields are already exists" });
  }
  return res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
};
