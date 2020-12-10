var express = require('express');
var router = express.Router({mergeParams: true});

const RoomMessageModel = require('../database/schemas/roomMessagesSchema');

// Route: /rooms/:id/messages
router.get('/', (req,res) => {
    const message = req.body.message;
    RoomMessageModel.find({ }).then( dbResponse => {
        res.json(dbResponse.map((dbMessage)=> dbMessage._doc))

    })
})

router.post('/', (req, res) => {
    const roomId = req.params.id;
    const userId = req.headers.userid;
    const userName = req.headers.username;
    const message = req.body.message; 
    const timeStamp = Date.now; 
    const newRoomMessage = new RoomMessageModel({ userId: userId, userName: userName, roomId: roomId, message:message });
    newRoomMessage.save().then( dbResponse => {
        if(dbResponse.errors){
            res.status(500);
            return res.end();
          }
      
          res.json(dbResponse._doc)
    })



})



module.exports = router;