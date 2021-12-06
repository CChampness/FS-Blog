const router = require('express').Router();
const { Topic, Post, Comment } = require('../models');
const Sequelize = require('sequelize');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all topics for homepage
router.get('/', async (req, res) => {
  try {
    const dbTopicData = await Topic.findAll({
      include: [
        {
          model: Post,
          attributes: ['content'],
        },
      ],
    });

    const topics = dbTopicData.map((topic) =>
      topic.get({ plain: true })
    );
    res.render('homepage', {
      topics,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the dashboard
// Use the custom middleware before allowing the user to access the dash
router.get('/dash', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id','title', 'blogger','post_date','content']
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dash', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one topic
// Use the custom middleware before allowing the user to access the topic
router.get('/topic/:id', withAuth, async (req, res) => {
  try {
    const dbTopicData = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: [
            'id',
            'title',
            'blogger',
            'post_date',
            'content',
          ],
        },
      ],
    });
    const topic = dbTopicData.get({ plain: true });
    res.render('topic', { topic, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
// Use the custom middleware before allowing the user to access the post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one comment
// Use the custom middleware before allowing the user to access the comment
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);
    const comment = dbCommentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the form to edit a Post
// Use the custom middleware before allowing the user to access this route
router.get('/editpost/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    const post = dbPostData.get({ plain: true });
    res.render('post-edit', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
