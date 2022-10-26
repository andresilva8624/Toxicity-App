const router = require('express').Router();
const { Comment } = require('../../models/');
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
                    return res.status(500).json("Comment wasn't bitchy enough!")
                }
            }
            const joinArr = sentences.join('. ');

            Comment.create({ body: joinArr, userId: req.session.userId, postId: req.body.postId })
            .then(commentNewPost => {
                res.json(commentNewPost)
            })

        })
    })
});

module.exports = router;
