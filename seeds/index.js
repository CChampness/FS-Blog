const sequelize = require('../config/connection');
const seedTopic = require('./topicData');
const seedPost = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTopic();

  await seedPost();

  process.exit(0);
};

seedAll();
