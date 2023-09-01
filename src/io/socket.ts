import { Socket } from "socket.io"
import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import { ClientRoom, RoomBag } from "../definitions/client_room"
import room from "./room"

let roomList: ClientRoom[]
let playerList: Player[]
let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
}


export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

//methods
const find = (id: number) => roomList.find((client) => client.room.id == id)
const list = () => { roomList.map((client)=>client.room) }


const add = (client: ClientRoom) => {
    const exists = find(client.room.id)
    //if (exists) remove(client)

    roomList.push(client)
}

const clients: RoomBag = {
    find,
    list,
    add
}

export const handleSocket = (socket: Socket) => {
    const io = getIoInstance()

    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
        const client = clients.get(socket)

       // if (client) room.logout(socket, room, client.user)
    })

    socket.on("room:new", (newRoom: Room ) => room.newRoom(socket, newRoom))

}