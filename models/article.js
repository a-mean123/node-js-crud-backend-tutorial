const mongoose = require('mongoose');


const Article = mongoose.model( 'Article' , {

    titre: String,
    description: String,
    likes: Number

} );

module.exports = Article;


