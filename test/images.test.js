const testWithServer = require('./helpers/test-with-server');

testWithServer('Request for Object Page with image', {}, (t, ctx) => {
  t.plan(3);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co26704',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    var response = JSON.parse(res.payload);

    t.equal(res.statusCode, 200, 'Found Object');
    t.ok(response.data.attributes.multimedia, 'Object has images');
    t.ok(response.data.attributes.multimedia[0].processed.large.location, 'Has path');
    t.end();
  });
});

testWithServer('Search for Object Page with image', {}, (t, ctx) => {
  t.plan(3);

  const htmlRequest = {
    method: 'GET',
    url: '/search/objects?q=rocket%20locomotive',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    var response = JSON.parse(res.payload);

    t.equal(res.statusCode, 200, 'Succesful request');
    t.ok(response.data[1], 'Got results');
    t.ok(response.data[1].attributes.multimedia, 'Second result has image');
    t.end();
  });
});

testWithServer('Object Page with no image', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co114820',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    var response = JSON.parse(res.payload);

    t.equal(res.statusCode, 200, 'Succesful request');
    t.ok(response.data, 'Got results');
    t.end();
  });
});
