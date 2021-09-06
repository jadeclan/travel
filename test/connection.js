const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

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