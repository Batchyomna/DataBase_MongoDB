const myMongo = require('mongodb').MongoClient //using mongo driver
const url = 'mongodb://localhost:27017'// picifying the connection URL

async function allTheRegion(){
    try{
        let my_liste = []
        let myData = await myMongo.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
        var myDataBase = myData.db("myFirstDataBase");
        var allCountry = await myDataBase.collection("country_full_data").find().toArray()//it 's an array every element is an object(counrty) who has 2 proporeties(_id&x)
        for( let i=0 ; i< allCountry.length; i++){
             //console.log(allCountry[0].region)//oneCountData is an object which has 2 proporeties _id & x
           //var oneCountData = JSON.parse(allCountry[i]);// parse x to every country to an array which has only element 
          //console.log(oneCountData[0])//to reach x change it to array(oneCount) of multy proporeties
          switch(allCountry[i].region){
              case "Europe":
                await myDataBase.collection("Europe").insertOne(allCountry[i])
              break;
              case "Asia":
                await myDataBase.collection("Asia").insertOne(allCountry[i])
              break;
              case "Africa":
                await myDataBase.collection("Africa").insertOne(allCountry[i])
              break;
              case "Oceania":
                await myDataBase.collection("Oceania").insertOne(allCountry[i])
              break;
              case "Polar":
                await myDataBase.collection("Polar").insertOne(allCountry[i])
              break;
              default :
                  switch (allCountry[i].subregion){
                      case "Northern America":
                        await myDataBase.collection("Northern America").insertOne(allCountry[i])
                      break;
                      case "South America":
                        await myDataBase.collection("South America").insertOne(allCountry[i])
                      break;
                      case "Central America":
                        await myDataBase.collection("Central America").insertOne(allCountry[i])
                      break;
                      case "Caribbean":
                        await myDataBase.collection("Caribbean").insertOne(allCountry[i])
                      break;
                    }
                break;
            }
        }
        myData.close()
      
    }catch(err){
        console.log(err)
        myData.close()

    }
}
allTheRegion()