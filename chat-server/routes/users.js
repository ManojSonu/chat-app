var express = require('express');
var router = express.Router();

const UsersModel = require('../database/schemas/usersSchema');

// Route: /users
router.post('/', function(req, res) {
  const newUser = new UsersModel({ name: req.body.name }); 
  newUser.save().then( (dbResponse ) => {
    if(dbResponse.errors){
      res.status(500);
      return res.end();
    }
    res.json(dbResponse._id)
  })

});

module.exports = router;
