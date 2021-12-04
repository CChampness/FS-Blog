const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const { profile } = require('console');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super Duper Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Don't drop and recreate tables because we need them to be seeded
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at port ', PORT));
});

// in mini-project
// in public/js/profile.js
// if (response.ok) {
//   document.location.replace('/profile');
