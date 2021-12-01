const sequelize = require('../config/connection');
const seedTopic = require('./topicData');
const seedPost = require('./postData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTopic();
  await seedPost();
  await seedComment();

  process.exit(0);
};

seedAll();
