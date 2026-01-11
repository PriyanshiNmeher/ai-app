import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { comment, deletePost, getAllPosts, like, saved, uploadPost, deleteComment } from "../controllers/post.controllers.js"


const  postRouter= express.Router()

postRouter.post("/upload", isAuth,upload.single("media") ,uploadPost)
postRouter.get("/getAll", isAuth, getAllPosts)
postRouter.get("/like/:postId", isAuth, like)
postRouter.post("/comment/:postId", isAuth,comment)
postRouter.get("/saved/:postId", isAuth,saved)
postRouter.delete(
  "/comment/:postId/:commentId",
  isAuth,
  deleteComment
)
postRouter.delete("/delete/:postId", isAuth, deletePost)


export default postRouter
