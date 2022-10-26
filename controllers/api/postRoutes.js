const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');
const toxicity = require('@tensorflow-models/toxicity');

router.post('/', withAuth, async (req, res) => {
    const body = req.body.body;
    const sentences = body.split('. ');
    console.log(sentences)
    const threshold = 0.5;
    toxicity.load(threshold).then((model) => {
        model.classify(sentences).then((predictions) => {
            const toxic = predictions.filter(prediction => prediction.label === "toxicity");
            const results = toxic[0].results;

            for (let i = 0; i < results.length; i++) {
                let truthy = results[i].match;
                console.log('testing: ', truthy)
            
                if (!truthy) {
                    return res.json("Post wasn't bitchy enough!")
                }
            }
            const joinArr = sentences.join('. ');

            Post.create({ title: req.body.title, body: joinArr, userId: req.session.userId })
            .then(newPost => {
                res.json(newPost)
            })

        })
    })
});

  // router.put('/:id', withAuth, async (req, res) => {
  //   try {
  //     const [affectedRows] = await Post.update(req.body, {
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  
  //     if (affectedRows > 0) {
  //       res.status(200).end();
  //     } else {
  //       res.status(404).end();
  //     }
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  // router.delete('/:id', withAuth, async (req, res) => {
  //   try {
  //     const [affectedRows] = Post.destroy({
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  
  //     if (affectedRows > 0) {
  //       res.status(200).end();
  //     } else {
  //       res.status(404).end();
  //     }
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  module.exports = router;