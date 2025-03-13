const adminAuth = (req, res, next) => {
  let token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unAuthorized");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  let token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unAuthorized");
  } else {
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
