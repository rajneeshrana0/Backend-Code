const express = require("express");

const router = express.Router();

// Import  Controler
const { dummyLink,likePost, unlikePost } = require("../controller/LikeController");
const { createComment } = require("../controller/commentController");
const { createPost, getAllPosts } = require("../controller/postController");

// Mapping Create
router.get("/dummyroute", dummyLink);

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);



module.exports = router;
