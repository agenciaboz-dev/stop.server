import {Socket} from "socket.io"

declare interface ClientRoom{
    socket: Socket
    room: Room
}

declare interface RoomBag {
    find: (id: number) => ClientRoom | undefined
    getRoom: (client: ClientRoom) => Room
    list: () => Room[] | []
    add: (client: ClientRoom) => void
    get: (socket: Socket) => ClientRoom | undefined
    //remove: (client: Client | undefined) => void
    //update: (client: Client, user: User & { status: number }) => Client[]
}
