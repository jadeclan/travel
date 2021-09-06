const Destination = require('../models/destination');
const assert = require('assert');

describe('Deleting a destination', function(){

  var dest;

  beforeEach(function(done){
    //Create a record in the empty collection, since we dropped it before each test).
    dest = new Destination({
      name: 'Sifnos'
    });

    dest.save().then(function(){
      done();
    });
  });

  //Create the tests
  it('Delete one destination from the database', function(done){
    Destination.findOneAndRemove({ name: 'Sifnos' }).then(function(){
      Destination.findOne({ name: 'Sifnos' }).then(function(result){
        assert(result === null);
        done();
    });
  });

  });
});