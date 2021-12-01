const { Comment } = require('../models');

const commentdata = [
  {
    commenter: 'Jackie Jones',
    comment_date: 'March 30, 2018',
    post_id: 1,
    comment_text:
      'Comment about Variables, assignment, functions.',
  },
  {
    commenter: 'JB Parshalls',
    comment_date: 'May 05, 2017',
    post_id: 1,
    comment_text: 'Comment about When (and why) you should use ES6 arrow functions.',
  },
];
console.log("commentdata: ",commentdata);
const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
