const express = require('express');
const {User} = require('../../models/user');
const {Poll, sanitizePoll} = require('../../models/poll');
const router = express.Router();

router.get('/:username/polls', (req, res) => {
  User.findOne({username: req.params.username})
    .then(user => {
      if (user)
        Poll.find({author: user.username})
          .then(polls => res.json(polls.map(sanitizePoll)))
          .catch(error => res.status(500).end(error.message));
      else res.status(400).end('Bad Request');
    })
    .catch(error => res.status(500).end(error.message));
});

module.exports = router;
