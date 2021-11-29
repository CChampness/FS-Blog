const router = require('express').Router();
const { Topic, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all topicss for homepage
router.get('/', async (req, res) => {
  try {
    const dbTopicData = await Topic.findAll({
      include: [
        {
          model: Painting,
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

// GET one topic
// Use the custom middleware before allowing the user to access the topic
router.get('/topic/:id', withAuth, async (req, res) => {
  try {
    const dbTopicData = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'blogger',
            'exhibition_date',
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

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
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
