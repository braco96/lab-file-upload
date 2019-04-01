const router = require("express").Router();

/* GET home page -> redirigimos al listado de posts */
router.get("/", (req, res, next) => {
  res.redirect("/posts");
});

module.exports = router;
