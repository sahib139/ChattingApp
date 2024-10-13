class VideoCallSocket {
    constructor({ io, socket }) {
        this.io = io;
        this.socket = socket;
        
        socket.on("joinRoom",(payload)=>{
            try {
                const roomID = payload.roomID;
                socket.join(roomID);
            } catch (error) {
                console.error("Error joining room:", error);
            }
        });

        socket.on('tell-other-user-to-joinRoom', (roomID) => {
            socket.broadcast.to(roomID).emit('joinRoom-other-user');
        });

        socket.on('offer', (payload) => {
            try {
                const roomID = payload.roomID;
                const offer = payload.offer;

                io.to(roomID).emit('offer-answer', { roomID, offer });
            } catch (error) {
                console.error("Error processing offer:", error);
            }
        });

        socket.on('answer', (payload) => {
            try {
                const roomID = payload.roomID;
                const answer = payload.answer;

                io.to(roomID).emit('answer-ack', { roomID, answer });
            } catch (error) {
                console.error("Error sending answer room:", error);
            }
        });

        socket.on('candidate', (payload) => {
            try {
                const roomID = payload.roomID;
                const candidate = payload.candidate;
                
                io.to(roomID).emit('candidate', { candidate });
            } catch (error) {
                console.error("Error sending candidate:", error);
            }
        });

    }


}

module.exports = VideoCallSocket;