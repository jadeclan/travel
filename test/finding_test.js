const Destination = require('../models/destination');
const assert = require('assert');

describe('Finding destinations', function(){

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
  it('Finds one destination from the database', function(done){
    Destination.findOne({ name: 'Sifnos' }).then(function(result){
      assert(result.name === 'Sifnos');
      done();
    });
  });

  it('Finds one destination by ID from the database', function(done){
    Destination.findOne({_id: dest._id }).then(function(result){
      //Note: _id is an object, so we need to convert them to strings
      assert(result._id.toString() === dest._id.toString());
      done();
    });
  });
});