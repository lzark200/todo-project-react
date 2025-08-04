const mongoose = require('mongoose')

async function mongoConnect(){

   const isConnected = await  mongoose.connect("mongodb+srv://iambeavernoob:n2v8MGuDYp6kjzUq@cluster0.iec9sup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

   if(isConnected){
    console.log('mongodb successfully connected...')
   }
   else{
    console.log({
        error : "error in connecting with mongodb atlas cloud database"
    })
   }
}

module.exports = {
    mongoConnect , 
}