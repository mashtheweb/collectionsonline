module.exports = function (queryParams) {
  const aggregationObjects = {
    filter: {
      bool: {
        should: [
          { term: {'type.base': 'agent'} },
          { term: {'type.base': 'object'} },
          { term: {'type.base': 'archive'} }
        ]
      }
    },
    aggs: {
      category: {
        filter: {
          bool: {
            must: filter(queryParams, 'category')
          }
        },
        aggs: {
          category_filters: {
            terms: { field: 'categories.value' }
          }
        }
      },
      maker: {
        filter: {
          bool: {
            must: filter(queryParams, 'maker')
          }
        },
        aggs: {
          maker_filters: {
            terms: { field: 'lifecycle.creation.maker.name.value' }
          }
        }
      },
      type: {
        filter: {
          bool: {
            must: filter(queryParams, 'type')
          }
        },
        aggs: {
          type_filters: {
            terms: { field: 'name.value' }
          }
        }
      },
      place: {
        filter: {
          bool: {
            must: filter(queryParams, 'place')
          }
        },
        aggs: {
          place_filters: {
            terms: { field: 'lifecycle.creation.places.name.value' }
          }
        }
      },
      user: {
        filter: {
          bool: {
            must: filter(queryParams, 'user')
          }
        },
        aggs: {
          user_filters: {
            terms: { field: 'agents.summary_title' }
          }
        }
      }
    }
  };

  return aggregationObjects;
};

function filter (queryParams, exclude) {
  var filters = [];
  // category
  if (exclude !== 'category') {
    const categories = queryParams.filter.objects.categories;
    if (categories) {
      filters.push({ terms: { 'categories.value': categories } });
    }
  }

  // maker
  if (exclude !== 'maker') {
    const makers = queryParams.filter.objects.makers;
    if (makers) {
      filters.push({ terms: { 'lifecycle.creation.maker.name.value': makers } });
    }
  }

  // type
  if (exclude !== 'type') {
    const type = queryParams.filter.objects.type;
    if (type) {
      filters.push({ terms: { 'name.value': type } });
    }
  }

  // places
  if (exclude !== 'place') {
    const places = queryParams.filter.all.places;
    if (places) {
      filters.push({ terms: { 'lifecycle.creation.places.name.value': places } });
    }
  }

  // user
  if (exclude !== 'user') {
    const user = queryParams.filter.objects.user;
    if (user) {
      filters.push({ terms: { 'agents.summary_title': user } });
    }
  }

  return filters;
}