const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '8f4b63cef0a747c38b676ca789a89a68'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('無法正常使用clarifai'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Error getting entries"))
}

// Common JS
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall,
}