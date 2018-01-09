const express = require('express');
const mongoose = require('mongoose');
const {Poll, sanitizePoll, createOption} = require('../../models/poll');
const authenticate = require('../../middlewares/authenticate');
const router = express.Router();

router.get('/', (req, res) => {
  Poll.find()
    .then(polls => res.json(polls.map(sanitizePoll)))
    .catch(error => res.status(500).end(error.message));
});

router.get('/:id', (req, res) => {
  const voter = req.user ? req.user.username : req.ip;
  if (mongoose.Types.ObjectId.isValid(req.params.id))
    Poll.findById(req.params.id)
      .then(poll => {
        if (poll) {
          const allVoters = poll.options.reduce((allVoters, option) => allVoters.concat(option.voters), []);
          const sanitizedPoll = sanitizePoll(poll);
          sanitizedPoll.voted = allVoters.indexOf(voter) >= 0;
          res.json(sanitizedPoll);
        }
        else res.status(404).end('Not found');
      })
      .catch(error => res.status(500).end(error.message));
  else res.status(400).end('Bad Request');
});

router.post('/', authenticate, (req, res) => {
  const poll = new Poll({
    title: req.body.title,
    options: req.body.options instanceof Array ?
      req.body.options.filter(option => option !== '').map(createOption) :
      [],
    author: req.user.username
  });
  const error = poll.validateSync();
  if (!error)
    poll.save()
      .then(() => res.status(200).end())
      .catch(error => res.status(500).end(error.message));
  else res.status(400).end(error.message);
});

router.post('/:id/options', authenticate, (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) && typeof req.body.title === "string" && req.body.title !== '')
    Poll.findById(req.params.id)
      .then(poll => {
        if (poll && !poll.options.find(option => option.title === req.body.title)) {
          poll.options.push(createOption(req.body.title));
          poll.save()
            .then(() => res.status(200).end())
            .catch(error => res.status(500).end(error.message));
        }
        else res.status(400).end('Bad Request');
      })
      .catch(error => res.status(500).end(error.message));
  else res.status(400).end('Bad Request');
});

router.post('/:id/vote', (req, res) => {
  const voter = req.user ? req.user.username : req.ip;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Poll.findById(req.params.id)
      .then(poll => {
        if (poll) {
          const allVoters = poll.options.reduce((allVoters, option) => allVoters.concat(option.voters), []);
          if (allVoters.indexOf(voter) < 0) {
            const option = poll.options.find(option => option.title === req.body.title);
            if (option) {
              if (option.voters.indexOf(voter) < 0) {
                option.voters.push(voter);
                poll.save()
                  .then(() => res.status(200).end())
                  .catch(error => res.status(500).end(error.message));
              } else res.status(403).end('Forbidden');
            } else res.status(400).end('Bad Request');
          } else res.status(403).end('Forbidden');
        } else res.status(400).end('Bad Request');
      })
      .catch(error => res.status(400).end(error.message));
  } else res.status(400).end('Bad Request');
});

router.delete('/:id', authenticate, (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id))
    Poll.findById(req.params.id)
      .then(poll => {
        if (poll) {
          if (poll.author === req.user.username)
            Poll.remove({_id: req.params.id})
              .then(() => res.status(200).end())
              .catch(error => res.status(500).end(error.message));
          else res.status(403).end('Forbidden');
        }
        else res.status(400).end('Bad Request');
      })
      .catch(error => res.status(500).end(error.message));
  else res.status(400).end('Bad Request');
});

module.exports = router;
