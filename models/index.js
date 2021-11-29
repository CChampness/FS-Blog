const User = require('./User');
const Topic = require('./Topic');
const Painting = require('./Painting');

Topic.hasMany(Painting, {
  foreignKey: 'topic_id',
});

Painting.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

module.exports = { User, Topic, Painting };
