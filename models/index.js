const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');
const Comment = require('./Comment');

Topic.hasMany(Post, {
  foreignKey: 'topic_id',
});

Post.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});


module.exports = { User, Topic, Post, Comment };
