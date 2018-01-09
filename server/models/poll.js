const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  options: {
    type: [{
      title: String,
      voters: [String]
    }],
    required: true,
    validate: {
      validator: options => options.length >= 1
    }
  }
});

const sanitizeOptions = options => options.map(option => ({
  title: option.title,
  votes: option.voters.length
}));

const createOption = title => ({
  title,
  voters: []
});

const sanitizePoll = poll => ({
  id: poll._id,
  title: poll.title,
  author: poll.author,
  options: sanitizeOptions(poll.options)
});

module.exports = {
  Poll: mongoose.model('Poll', PollSchema),
  PollSchema,
  sanitizePoll,
  createOption
};
