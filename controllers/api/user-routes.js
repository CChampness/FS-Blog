const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
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
router.post('/newcomment', withAuth, async (req, res) => {
  console.log(">>>>>>>>>>>>>>> /newcomment post route <<<<<<<<<<<<<<<");
  console.log("req.body:", req.body);
  try {
    let dbCommentData = await Comment.create({
      commenter: req.body.commenter,
      comment_date: req.body.comment_date,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id
    });

    // dbCommentData = await Comment.findAll({
    //   where: {
    //     post_id: req.body.post_id
    //   }
    // });

    // const comments = dbCommentData.map((comment) =>
    //   comment.get({ plain: true })
    // );
    // console.log("comments going back to client from /newcomment",comments);

    // res.status(200).render('post', {
    //   comments,
    //   loggedIn: req.session.loggedIn
    // });

    // dbPostData = await Post.findAll({
    //   attributes: ['id','title', 'blogger','post_date','content']
    // });

    // const posts = dbPostData.map((post) =>
    //   post.get({ plain: true })
    // );
    // res.status(200).render('dash', {
    //   posts,
    //   loggedIn: req.session.loggedIn,
    // });
//////////////////
  const dbPostData = await Post.findByPk(req.body.post_id, {
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'commenter',
          'comment_date',
          'comment_text',
        ],
      },
    ],
  });

  const post = dbPostData.get({ plain: true });
  res.render('post', { post, loggedIn: req.session.loggedIn });
// } catch (err) {
//   console.log(err);
//   res.status(500).json(err);
// }

//////////////////

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post
// Use the custom middleware before allowing the user to access this route
router.post('/newpost', withAuth, async (req, res) => {
  try {
    let dbPostData = await Post.create({
      title: req.body.title,
      blogger: req.body.blogger,
      post_date: req.body.post_date,
      content: req.body.content,
      topic_id: req.body.topic_id
    });

    dbPostData = await Post.findAll({
      attributes: ['id','title', 'blogger','post_date','content']
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    console.log("posts goint back to client from /newpost",posts);
    res.status(200).render('dash', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a post
// Use the custom middleware before allowing the user to access this route
router.post('/deletepost', withAuth, async (req, res) => {
  try {
    const numDeleted = await Post.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (!numDeleted) {
      res
        .status(400)
        .json({ message: 'Post not found; nothing deleted!' });
      return;
    }

    dbPostData = await Post.findAll({
      attributes: ['id','title', 'blogger','post_date','content']
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('dash', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post
// Use the custom middleware before allowing the user to access this route
router.post('/updatepost/:id', withAuth, async (req, res) => {
  try {
    const dbPostReturn = await Post.update({content: req.body.comment_text}, {
      where: {
        id: req.body.post_id
      }
    });

    if (!dbPostReturn) {
      res
        .status(400)
        .json({ message: 'Post not found; nothing updated!' });
      return;
    }
    dbPostData = await Post.findAll({
      attributes: ['id','title', 'blogger','post_date','content']
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('dash', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
