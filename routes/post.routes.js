const router = require("express").Router();
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn } = require("../middleware/route-guard");

// Ruta que muestra el formulario para crear un nuevo post
router.get("/posts/create", isLoggedIn, (req, res) => {
  res.render("posts/post-form");
});

// Ruta que gestiona la creación del post junto con la subida de la imagen
router.post("/posts/create", isLoggedIn, fileUploader.single("image"), (req, res, next) => {
  const { content } = req.body;
  const creatorId = req.session.currentUser._id;

  const picPath = req.file?.path;
  const picName = req.file?.originalname;

  Post.create({ content, creatorId, picPath, picName })
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
});

// Ruta que muestra todos los posts (home page)
router.get("/posts", (req, res, next) => {
  Post.find()
    .populate("creatorId")
    .then((posts) => {
      res.render("posts/post-list", { posts, user: req.session.currentUser });
    })
    .catch((err) => next(err));
});

// Ruta que muestra los detalles de un post específico
router.get("/posts/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .populate("creatorId")
    .then((post) => {
      res.render("posts/post-details", { post, user: req.session.currentUser });
    })
    .catch((err) => next(err));
});

// Ruta que permite añadir comentarios a un post
router.post("/posts/:id/comments", isLoggedIn, fileUploader.single("image"), (req, res, next) => {
  const { content } = req.body;
  const authorId = req.session.currentUser._id;
  const imagePath = req.file?.path;
  const imageName = req.file?.originalname;

  Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { content, authorId, imagePath, imageName } } },
    { new: true }
  )
    .then(() => res.redirect(`/posts/${req.params.id}`))
    .catch((err) => next(err));
});

module.exports = router;
