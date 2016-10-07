const test = require('tape');
const config = require('../../config');
const buildJSONResponse = require('../../lib/jsonapi-response');
const JSONAPIResponse = buildJSONResponse(require('../fixtures/elastic-responses/example-get-response-object3.json'), config);
const buildHTMLData = require('../../lib/transforms/json-to-html-data');
var HTMLData;

test('All makers should be found', function (t) {
  t.plan(2);
  t.doesNotThrow(() => {
    HTMLData = buildHTMLData(JSONAPIResponse);
  }, 'Transform did not throw error');
  t.equal(HTMLData.fact.find((el) => el.key === 'maker').value, 'Cameron, Julia Margaret', 'Facts should contain a maker');
  t.end();
});
