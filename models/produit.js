const mongoose = require('mongoose');


const Produit = mongoose.model( 'Produit' , {

    titre: String,
    description: String,
    prix: Number

} );

module.exports = Produit;