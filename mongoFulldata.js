const fetch = require('node-fetch')
const myMongo = require('mongodb').MongoClient //using mongo driver
const url = 'mongodb://localhost:27017'// picifying the connection URL

async function fullData() {
    try {
        var myarray = []
        let myData = await myMongo.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
        var myDataBase = myData.db("myFirstDataBase");
        var allCountry = await myDataBase.collection("country_names").find().toArray()
        //console.log(allCountry)
        for (let i = 0; i < allCountry.length; i++) {
            var response = await fetch(`https://restcountries.eu/rest/v2/name/${allCountry[i].name}`)
            response = await response.json();
            myarray.push(response)
        }
       /* for (let j = 0; j < myarray.length; j++) {
            let x = JSON.stringify(myarray[j])
        await myDataBase.collection("test").insertOne({x})
        }*/
        for (let j = 0; j < myarray.length; j++) {
           // console.log(myarray[j][0])
        await myDataBase.collection("country_full_data").insertOne(myarray[j][0])
        }
        myData.close()
    } catch (err) {
        console.log(err)
        myData.close()
    }
};
fullData()
