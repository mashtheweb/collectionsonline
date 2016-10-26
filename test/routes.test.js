const testWithServer = require('./helpers/test-with-server');
const dir = __dirname.split('/')[__dirname.split('/').length - 1];
const file = dir + __filename.replace(__dirname, '') + ' > ';

testWithServer(file + 'Request for Archive HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aa110000316',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Attempt to request for Archive HTML Page with wrong accept header', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aa110000316',
    headers: {'Accept': 'wrongContent'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 406, 'Wrong accept header');
    t.end();
  });
});

testWithServer(file + 'Request for Archive JSON Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aa110000316',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Archive HTML Page for a wrong id', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aawrongid',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 404, 'Status code was as expected');
    t.end();
  });
});

// testWithServer(file + 'Request for Archive HTML Page with expanded children', {}, (t, ctx) => {
//   t.plan(1);
//
//   const htmlRequest = {
//     method: 'GET',
//     url: '/documents/aa110000003?expanded=aa110000036',
//     headers: {'Accept': 'text/html'}
//   };
//
//   ctx.server.inject(htmlRequest, (res) => {
//     t.equal(res.statusCode, 200, 'Status code was as expected');
//     t.end();
//   });
// });

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co37959',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co193432',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co129834',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co26704',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co26704',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co62243',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object HTML Page for a wrong id', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/cowrongid',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 404, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Person HTML Page', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/people/cp17351',
    headers: {'Accept': 'text/html'}
  };
  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Person HTML Page who doesn\'t exists', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/people/cpwrongid',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 404, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Person HTML Page with related items', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/people/ap8',
    headers: {'Accept': 'text/html'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.ok(res.payload.indexOf('Babbage') > -1, 'Page loaded correctly');
    t.end();
  });
});

testWithServer(file + 'Request for Person JSON Page with no related items', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/people/ap24329',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Archive JSON', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aa110000003',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.equal(res.headers['content-type'], 'application/vnd.api+json', 'JSONAPI response header should be application/vnd.api+json');
    t.end();
  });
});

testWithServer(file + 'Request for Archive JSON with error', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/documents/aawrongid',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 404, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object JSON Page', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/co37959',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.ok(res.headers['content-type'].indexOf('application/vnd.api+json') > -1, 'JSONAPI response header should be application/vnd.api+json');
    t.end();
  });
});

testWithServer(file + 'Request for Object JSON Page for a wrong id', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/cowrongid',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 404, 'Status code was as expected');
    t.end();
  });
});

testWithServer(file + 'Request for Object Page with wrong accept headers', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/objects/cowrongid',
    headers: {'Accept': 'wrongContent'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 406, 'Status code was as expected, 406');
    t.end();
  });
});

testWithServer(file + 'Request for Person JSON Page', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/people/cp17351',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 200, 'Status code was as expected');
    t.ok(res.headers['content-type'].indexOf('application/vnd.api+json') > -1, 'JSONAPI response header should be application/vnd.api+json');
    t.end();
  });
});

testWithServer(file + 'Request for Person JSON Page for a wrong id', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/people/cpwrongid',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.ok(res.statusCode, 404, 'status is 404');
    t.end();
  });
});

testWithServer(file + 'Request for Person JSON Page with the wrong accept headers', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/people/cp17351',
    headers: {'Accept': 'wrongContent'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.equal(res.statusCode, 406, 'Status code was as expected as 406');
    t.end();
  });
});

testWithServer(file + 'Request for home JSON Page', {}, (t, ctx) => {
  t.plan(2);

  const htmlRequest = {
    method: 'GET',
    url: '/',
    headers: {'Accept': 'application/vnd.api+json'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.ok(res.statusCode, 200, 'status is 200');
    t.ok(res.payload === 'See https://github.com/TheScienceMuseum/collectionsonline/wiki/Collections-Online-API on how to use the api', 'Response json home page ok');
    t.end();
  });
});

testWithServer(file + 'Attemp to get the home JSON Page with the wrong accept header', {}, (t, ctx) => {
  t.plan(1);

  const htmlRequest = {
    method: 'GET',
    url: '/',
    headers: {'Accept': 'wrongContent'}
  };

  ctx.server.inject(htmlRequest, (res) => {
    t.ok(res.statusCode, 406, 'status is 406');
    t.end();
  });
});
