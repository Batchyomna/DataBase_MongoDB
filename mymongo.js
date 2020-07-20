const fsPromises = require('fs').promises
const myMongo = require('mongodb').MongoClient //using mongo driver
const url = 'mongodb://localhost:27017'// picifying the connection URL


async function myserver() {
    try {
        // myMongo.set('useUnifiedTopology', true);
        // Mongoose 5.7 uses MongoDB driver 3.3.x, 
        //which introduced a significant refactor of how it handles monitoring all the servers
        //in a replica set or sharded cluster. In MongoDB parlance,
        // this is known as server discovery and monitoring.
        //to opt in to using the new topology engine, 

        let dataB = await myMongo.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }) //connecting to the database
        //console.log(data)
        var myDataBase = dataB.db("myFirstDataBase"); // create database of the the data that return of our connectio wity the method db()
        let mycountries = await fsPromises.readFile('country_names.json', "utf8");// to have the data stocked    
        mycountries = JSON.parse(mycountries);// 
       // console.log(mycountries.length)
        await myDataBase.createCollection("country_names")
        //If the documents do not specify an _id field,
        // MongoDB adds the _id field with an ObjectId value to each document
        for (let i = 0; i < mycountries.length; i++) {
            await myDataBase.collection("country_names").insertOne({name : mycountries[i]})
         }
        dataB.close();
    } catch (error) {
        console.log(error)
        dataB.close();
    }
};
myserver();
