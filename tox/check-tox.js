const toxicity = require('@tensorflow-models/toxicity');

let filterPosts = async (sentences) => {
    const threshold = 0.5;
    toxicity.load(threshold).then((model) => {
        // const sentences = ["You are a tiny, little baby poop", "My favorite color is blue. I hate people.", "Shut up!"];
        model.classify(sentences).then((predictions) => {
            const toxic = predictions.filter(prediction => prediction.label === "toxicity");
            // console.log(JSON.stringify(toxic))

            const results = toxic[0].results;
            console.log(results)

            for (let i = 0; i < results.length; i++) {
                let truthy = results[i].match;
                console.log('testing: ', truthy)
                // let sentence = sentences[i];
                if (!truthy) {
                    return false
                }
            }
            return true
        })
    })
}


module.exports = { filterPosts }