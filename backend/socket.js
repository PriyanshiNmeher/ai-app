// for bidirectional communication setup
// node.js and express.js server gives the response till our requesting but using socket io we will create a server which can send response even without any request 
// Now we will make a simple node.js server and then modify it according socket io server requirement

import http from "http"
import express from "express"
import { Server } from "socket.io"



const app=express()
const server=http.createServer(app)

// The basic server req,res is ready 
// Now adding socket io
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

const userSocketMap={}

export const getSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    if(userId!=undefined){
        userSocketMap[userId]=socket.id
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})

export {app,io,server}