const VideoCallSocket = require("./videoCallSocket");
const ChatSocket = require("./chatSocket");

class SocketIo{
    constructor(io){
        this.io = io;
        this.io.on("connection", (socket) => {

            socket.on("chat-intialization",()=>{
                console.log(`User chat socket initialize: ${socket.id}`);

                this.chatInitialzation({io:this.io,socket})
            });

            socket.on("is-video-call-possible",({roomID})=>{
                const roomSockets = io.of('/').adapter.rooms.get(roomID);

                if(roomSockets && roomSockets.size > 1){
                    io.to(roomID).emit('is-video-call-possible-ans',{is_possible:true});
                }else{
                    io.to(roomID).emit('is-video-call-possible-ans',{is_possible:false});
                }
            });
            socket.on("video-initialization",({roomID})=>{
                console.log("User video socket initialize:",socket.id);
                
                this.videoCallInitialzation({io,socket,roomID:roomID})
            });

            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.id}`);
            });

            socket.on('redirect-other-user-to-videoCall-page',({roomID,url})=>{
                io.to(roomID).emit('redirect-other-user-to-videoCall-page',{url});
            });
        });  

    }

    chatInitialzation({io,socket}){
        new ChatSocket({io,socket});
    }

    videoCallInitialzation({io,socket,roomID}){
        new VideoCallSocket({io,socket});
        socket.join(roomID);
        const roomSockets = io.of('/').adapter.rooms.get(roomID);

        if(roomSockets && roomSockets.size > 1){
            socket.emit('ready-for-videocall',{roomID:roomID});
        } else {
            socket.emit('not-enough-peers', { message: 'Not enough peers to start a video call.' });
        }
    }
}

module.exports = SocketIo;