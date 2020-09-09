const mongoose = require('mongoose')

module.exports = ()=> {
    mongoose.connect(process.env.DB_String,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const db = mongoose.connection
    db.on('open', ()=>{
        console.log('Mongodbga onlayn ulandnik');
    })
    db.on('error', ()=>{
        console.log(err);
    })
}