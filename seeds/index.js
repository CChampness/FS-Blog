const sequelize = require('../config/connection');
const seedTopic = require('./topicData');
const seedPost = require('./postData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTopic();
  console.log(">>>>>>>>>>>>seedTopic<<<<<<<<<<<<<<");
  await seedPost();
  console.log(">>>>>>>>>>>>>>>seedPost<<<<<<<<<<<<");
  await seedComment();
  console.log(">>>>>>>>>>>>>seedComment<<<<<<<<<<<<<<");

  process.exit(0);
};

seedAll();
