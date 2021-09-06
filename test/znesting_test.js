const assert = require('assert');
const Destination = require('../models/destination');
const mongoose = require('mongoose');

//Describe tests
describe('Nesting records', function(){
  //Create tests
  it('Creates a destination with pictures', function(done){
    var sifnos = new Destination({
      name: 'Sifnos',
      airport: true,
      area: 91,
      population: 2200,
      pageVisits: 0,
      pictures: [ {
        title: 'Homes of Apollonia', 
        fileName: 'street.jpg',
        description: 'Homes in Apollonia',
        source: 'https://thenomadvisor.com/where-to-stay-in-sifnos/',
        timesClicked: 0 
      }, {
        title: 'Tiled streets of Apollonia', 
        fileName: 'ApolloniaShops.jpg',
        description: 'Shopping in Apollonia',
        source: 'https://www.travel-zone-greece.com/blog/sifnos-villages-settlements/',
        timesClicked: 0 
      }]
    });

    sifnos.save().then(function(){
      Destination.findOne({ name: 'Sifnos'}).then(function(result){
        assert(result.pictures.length === 2);
        done();
      })
    });
  });

  it('Add a picture to a destination',function(done){
    var sifnos = new Destination({
      name: 'Sifnos',
      airport: true,
      area: 91,
      population: 2200,
      pageVisits: 0,
      pictures: [ {
        title: 'Homes of Apollonia', 
        fileName: 'street.jpg',
        description: 'Homes in Apollonia',
        source: 'https://thenomadvisor.com/where-to-stay-in-sifnos/',
        timesClicked: 0 
      }, {
        title: 'Tiled streets of Apollonia', 
        fileName: 'ApolloniaShops.jpg',
        description: 'Shopping in Apollonia',
        source: 'https://www.travel-zone-greece.com/blog/sifnos-villages-settlements/',
        timesClicked: 0 
      }]     
    });

    sifnos.save().then(function(){
      Destination.findOne({ name: 'Sifnos'}).then(function(result){
        //Add a picture to the pictures array
        result.pictures.push({
          title: 'Chrisopigi Monastery',
          fileName: 'ChrisopigiMonastery.jpg',
          description: 'The Chrisopigi Monastery is just south of the exceptionally blue waters of Faros and Apo­kofto.',
          source: 'https://www.sailingissues.com/greekislands/sifnos.html',
          timesClicked: 0
        });

        result.save().then(function(){
          Destination.findOne({name: 'Sifnos'}).then(function(result){
            assert(result.pictures.length === 3);
            done();
          });
        });
      });
    });
  })
})