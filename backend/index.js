import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loopRoutes.js";
import storyRouter from "./routes/story.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket.js";
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()

const port = process.env.PORT || 5000

app.use(helmet())
app.use(morgan("dev"))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}))
app.use(cors({
    origin : process.env.FRONTEND_URL,
    // origin : "http://localhost:5173",
   
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/loop", loopRouter)
app.use("/api/story", storyRouter)
app.use("/api/message", messageRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong"
  })
})

server.listen(port, ()=>{
    connectDb()
    console.log("Starting server")
})
