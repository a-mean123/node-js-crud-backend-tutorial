const mongoose = require('mongoose');


const Article = mongoose.model( 'Article' , {

    titre: String,
    description: String,
    likes: Number,
    image: String

} );

module.exports = Article;


