import { Socket } from "socket.io"

const newRoom = async (socket: Socket, newRoom: any) => {
    let room =  
    if(room){
        socket.emit("room:new:success")
        socket.broadcast.emit("room:new")
    } else {
        socket.emit("room:new:failed")
    }
}

export default {newRoom}