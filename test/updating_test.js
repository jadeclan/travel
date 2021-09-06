const Destination = require('../models/destination');
const assert = require('assert');

describe('Updating a destination', function(){

  var dest;

  beforeEach(function(done){
    //Create a record in the empty collection, since we dropped it before each test).
    dest = new Destination({
      name: 'Sifnos',
      pageVisits: 10
    });

    dest.save().then(function(){
      done();
    });
  });

  //Create the tests
  it('Update one destination in the database', function(done){
    Destination.findOneAndUpdate({ name: 'Sifnos' }, { name: 'New Sifnos' }).then(function(){
      Destination.findOne({ _id: dest._id }).then(function(result){
        assert(result.name === 'New Sifnos');
        done();
      });
    });
  });

  it('Increments the number of page visits by 1', function(done){
    Destination.updateOne({name: 'Sifnos' }, {$inc: {pageVisits: 1}}).then(function(){
      Destination.findOne({name: 'Sifnos'}).then(function(result){
        assert(result.pageVisits === 11);
        done();
      })
    });
  });
});