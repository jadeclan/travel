const mongoose = require('mongoose');

//Connect to the databse before tests run
before(function(done){
  //Connect to the mongodb
  mongoose.connect('mongodb://localhost/travel');

  mongoose.connection.once('open', function(){
    console.log("Connection was sucessful");
    done();
  }).on('error', function(error){
    console.log('Connection failed: ', error);
  });
})

after(function(done){
  mongoose.connection.close();
  done();
})

//Drop the destination collection before each test
beforeEach(function(done){
  //Drop the collection
  mongoose.connection.collections.destinations.drop(function(){
    done();
  });
});