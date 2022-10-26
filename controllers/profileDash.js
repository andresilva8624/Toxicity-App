const router = require('express').Router();
const { Post ,User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('allPostAdmin', {
      layout: 'profileDash',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new',withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'profileDash',
  });
});
router.get('/profile', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // const user = userData.get({ plain: true });

    res.render('allPost', {
      layout: 'profileDash',
      posts,
      // ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);

//     if (postData) {
//       const post = postData.get({ plain: true });

//       res.render('edit-post', {
//         layout: 'profileDash',
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect('login');
//   }
// });

module.exports = router;
