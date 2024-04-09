const CrudRepository = require("./crud-repository");
const { Room } = require("../models/index");

class RoomRepository extends CrudRepository {

    constructor() {
        super(Room);
    }

    async destroyRoomWithTwoUsers(user1, user2) {
        try {
            const response = await Room.findOneAndDelete({
                $and: [
                    { users: user1 },
                    { users: user2 },
                    { users: { $size: 2 } }
                ]
            });
            return response.id;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

module.exports = RoomRepository;