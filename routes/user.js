var express = require('express');
var router = express.Router();
var User = require('../models/User');

// GET user
router.get('/:userId', function (req, res)
{
  var userId = req.params.userId;
  console.log('Trying to get user with id', userId);
  if (!userId.match(/^[0-9a-fA-F]{24}$/))
  {
    res.status(200).json(null);
    console.log('userId parameter check fails, sending 200 with null');
    return;
  }
  User.findById(req.params.userId)
    .then(function (user)
    {
      res.status(200).json(user);
      console.log('[SUCCESS] got user\n', user);
    })
    .catch(function (error)
    {
      res.status(500).json(error);
      console.error('[ERROR] getting user with id ', userId);
    });
});

// PUT new user
router.put('/', function (req, res)
{
  var user = new User(req.body);
  console.log('Trying to create a user\n', user);
  user.save()
    .then(function (savedUser)
    {
      res.status(200).json(savedUser);
      console.log('[SUCCESS] created new user %s(%s)', savedUser.username, savedUser._id);
    })
    .catch(function (error)
    {
      var status = 500;
      if (error.name == 'ValidationError')
        status = 400;

      res.status(status).json(error);
      console.error('[ERROR] creating user\n', error);
    });
});

// POST update current user
router.post('/:userId', function (req, res)
{
  var userId = req.params.userId;
  console.log('Trying to get user for update with id', userId);
  if (!userId.match(/^[0-9a-fA-F]{24}$/))
  {
    var error = {name: 'ValidationError', message: 'Wrong userId provided'};
    res.status(400).json(error);
    console.error('[ERROR] getting user for update\n', error);
    return;
  }
  User.findById(userId)
    .then(function (user)
    {

    })
    .catch(function (error)
    {
      res.status(500).json(error);
      console.error('[ERROR] getting user for update with id ' + userId, error);
    })
});

module.exports = router;