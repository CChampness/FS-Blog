const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  console.log(">>>>>>>>>> / route for CREATE NEW USER in user-routes.js <<<<<<<<<<<<<<<<<");
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      // req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>> /login route in user-routes.js  <<<<<<<<<<<<<<<<<");
  console.log(">>>>>>>>>>>>>>>>>>>>>>> email:",req.body.email," <<<<<<<<<<<<<<<<<");
  console.log(">>>>>>>>>>>>>>>>>>>>>>> password:",req.body.password," <<<<<<<<<<<<<<<<<");
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create a comment
// Use the custom middleware before allowing the user to access this route
router.post('/newcomment', async (req, res) => {
  console.log(">>>>>>>>>>>>>> newcomment post route <<<<<<<<<<<<<<<<");
  try {
    const dbCommentData = await Comment.create({
      commenter: req.body.commenter,
      comment_date: req.body.comment_date,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id
    });

    // const post = dbPostData.get({ plain: true });
    // console.log(post);
    // res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
