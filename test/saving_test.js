const Destination = require('../models/destination');
const assert = require('assert');

describe('Saving a destination', function(){
  it('Saves a destination to the database', function(done){
    var dest = new Destination({
      name: 'Sifnos'
    });

    dest.save().then(function(){
      assert(dest.isNew === false);
      done();
    });
  });
});