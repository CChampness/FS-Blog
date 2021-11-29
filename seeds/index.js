const sequelize = require('../config/connection');
const seedTopic = require('./topicData');
const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedTopic();

  await seedPaintings();

  process.exit(0);
};

seedAll();
