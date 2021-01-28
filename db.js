const {MongoClient} = require('mongodb');

var dbobj;
module.exports = {
  connectToDB: (callback )=>{
    MongoClient.connect(
        `mongodb+srv://rajat:mapple1205@assignment.uz4wq.mongodb.net/w3topics?retryWrites=true&w=majority`,
        { useNewUrlParser: true , useUnifiedTopology: true}, ( err, client )=> {
            if(!err) dbobj = client.db("w3topics");
            return callback( err,"w3topics" );
        }
    );
  },
  w3Topics:()=>{
    return dbobj.collection("w3Topics");
  }
}