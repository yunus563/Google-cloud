const mongoose = require('mongoose')
// const FinOrCreate = require('mongoose-find-or-create') 

const newSchema = mongoose.Schema({

    googleID :{
        type:String,
        unique: true,
    },
    name:String,
    surname:String,
    ProfilePhoto:String,


})
// newSchema.plugin(FinOrCreate)
module.exports = mongoose.model( 'GoogleUSer',newSchema )