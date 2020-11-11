const express = require('express');
const Joi = require('joi');
const genres = require('./genres/genres');
let router = express.Router();

router.get('/vidly.com', (req, res) => {
     res.send('<h1>Welcome to Vidly World, where you can immerse yourself in Film Heaven!</h1>');
 });


router
    .route('/vidly.com/api/genres')   
    .get((req, res) => {
        res.send(genres);
    })
    .post((req, res) => {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = {
            no: genres.length + 1,
            name: req.body.name
        };
        genres.push(genre);
        res.redirect('/vidly.com/api/genres');
    });
    


router
    .route('/vidly.com/api/genres/:no')
    .get((req, res) => {
        const genre = genres.find(value => value.no === parseInt(req.params.no));
        if (!genre) return res.status(404).send('<h2>The given no. is not found! Please try again.</h2>');
        res.send(genre);
    })
    .put((req, res) => {
        const genre = genres.find(value => value.no === parseInt(req.params.no));//the find() method could be 
                                                                                //replaced by filter() method.
        if (!genre) return res.status(404).send('<h2>The given no. is not found! Please try again.</h2>');

        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        genre.name = req.body.name;
        res.send(genre);
    })
    .delete((req, res) => {
        const genre = genres.find(value => value.no === parseInt(req.params.no));
        if (!genre) return res.status(404).send('<h2>The given no. is not found! Please try again.</h2>');

        const indexOfGenre = genres.indexOf(genre);
        genres.splice(indexOfGenre, 1);
        res.send(genre);

    });

    function validateGenre(genre) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(30).required()
        });
        return schema.validate(genre);
    }    

    module.exports = router;
