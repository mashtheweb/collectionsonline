const fs = require('fs');
const async = require('async');
const Client = require('elasticsearch').Client;
const config = require('../config');
const elastic = new Client(config.elasticsearch);
const localElastic = new Client(config.localElastic);

var ids = JSON.parse(fs.readFileSync('./ids.json'));

async.series([
  function (next) {
    for (var i = 0; i < 1; i++) {
      elastic.get({index: 'smg', type: ids[i].split('-')[1], id: ids[i], timeout: 2000000, requestTimeout: 2000000}, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        localElastic.index({index: result._index, id: result._id, type: result._type, body: result._source}, (err, response) => {
          if (err) console.log(err);
          console.log(response);
        });
      });
    }
    next();
  },
  function (next) {
    for (var i = 220000; i < 306432; i++) {
      elastic.get({index: 'smg', type: ids[i].split('-')[1], id: ids[i], timeout: 2000000, requestTimeout: 2000000}, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        localElastic.index({index: result._index, id: result._id, type: result._type, body: result._source}, (err, response) => {
          if (err) console.log(err);
          console.log(response);
        });
      });
    }
    next();
  }
]);
