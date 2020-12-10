var express = require('express');
var router = express.Router();

const messagesRouter = require('./messages');

const RoomsModel = require('../database/schemas/roomsSchema');
const RoomMembersModel = require('../database/schemas/roomMembersSchema');


// Route: /rooms

router.use('/:id/messages', messagesRouter );

router.get('/',(req,res) => {
    RoomsModel.find({ }).then( dbResponse  => {
        res.json(dbResponse.map((dbRoom)=> dbRoom._doc));
    })
});

router.post('/:id/join', (req,res) => {
    const roomId = req.params.id;
    const userId = req.headers.userid;
    const newRoomMember = new RoomMembersModel({ roomId: roomId, userId: userId })
    newRoomMember.save().then( dbResponse => {
        if(dbResponse.errors) {
            res.status(500);
            return res.end();
        }
        res.end();
    })
})

router.post('/:id/leave', (req,res) => {
    const roomId = req.params.id;
    const userId = req.headers.userid;
    RoomMembersModel.deleteOne( { roomId: roomId, userId: userId }).then( dbResponse => {
        if(dbResponse.errors) {
            res.status(500);
            return res.end();
        }
        res.end();
    })
})


module.exports = router;