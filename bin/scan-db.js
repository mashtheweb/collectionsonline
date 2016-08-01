const Client = require('elasticsearch').Client;
const config = require('../config');
const elastic = new Client(config.elasticsearch);
const localElastic = new Client(config.localElastic);
// const getMapping = require('./get-mapping');
// getMapping(elastic, 'smg', function (error, response) {
//   if (error) {
//     console.log('error mapping', error);
//   }
//
// });
var count = 0;
elastic.search({
  index: 'smg',
  scroll: '30s',
  size: 1000,
  search_type: 'scan'
}, function getMoreUntilDone (error, response) {
  if (error) {
    console.log('error', error);
  }
  var bulk = [];
  response.hits.hits.forEach(function (e) {
    bulk.push({index: {_index: e._index, _type: e._type, _id: e._id}});
    bulk.push(e._source);
    count += 1;
  });
  console.log(count, ' of ', response.hits.total);

  localElastic.bulk({body: bulk}, function (err, resp) {
    if (err) {
      console.log('bulk err', err);
    }
    if (response.hits.total !== count) {
    // now we can call scroll over and over
      elastic.scroll({
        scrollId: response._scroll_id,
        scroll: '30s'
      }, getMoreUntilDone);
    } else {
      console.log('search finished: ', count, 'item indexed');
    }
  });
});
