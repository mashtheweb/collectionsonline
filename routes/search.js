const Joi = require('joi');
const Boom = require('boom');
const filterSchema = require('../schemas/filter');
const searchSchema = require('../schemas/search');
const searchResultsToJsonApi = require('../lib/transforms/search-results-to-jsonapi');
const searchResultsToTemplateData = require('../lib/transforms/search-results-to-template-data');
const search = require('../lib/search');
const createQueryParams = require('../lib/query-params/query-params');
const contentType = require('./route-helpers/content-type.js');
const parseParameters = require('./route-helpers/parse-params');

module.exports = (elastic, config) => ({
  method: 'GET',
  path: '/search/{filters*}',
  config: {
    handler: function (request, reply) {
      var responseType = contentType(request);

      if (responseType === 'notAcceptable') {
        return reply('Not Acceptable').code(406);
      }

      Joi.validate({query: request.query},
        {
          query: filterSchema(responseType).keys(searchSchema.query)
        }, (err, value) => {
          if (err) return reply(Boom.badRequest(err));

          const params = parseParameters(request.params).params;
          const categories = parseParameters(request.params).categories;

          Joi.validate({params: params, categories: categories, query: value.query},
            {
              params: Joi.any(),
              categories: filterSchema('html').keys(searchSchema.query),
              query: filterSchema('html').keys(searchSchema.query)
            }, (err, value) => {
              if (err) return reply(Boom.badRequest(err));

              const query = Object.assign(value.query, value.params, value.categories);
              const queryParams = createQueryParams(responseType, {query: query, params: params});

              if (responseType === 'html') {
                search(elastic, queryParams, (err, result) => {
                  if (err) return reply(Boom.serverUnavailable(err));

                  const jsonData = searchResultsToJsonApi(queryParams, result, config);
                  const tplData = searchResultsToTemplateData(queryParams, jsonData);

                  return reply.view('search', tplData);
                });
              } else if (responseType === 'json') {
                search(elastic, queryParams, (err, result) => {
                  if (err) return reply(Boom.serverUnavailable(err));
                  return reply(searchResultsToJsonApi(queryParams, result, config))
                  .header('content-type', 'application/vnd.api+json');
                });
              }
            }
          );
        }
      );
    }
  }
});
