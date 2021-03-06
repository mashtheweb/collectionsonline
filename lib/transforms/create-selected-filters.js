/**
* Create a selectedFilters object which represent the selected fitlters
* {filter[occupation]: { 'mathematician': true, 'inventor': true}, filter[born[date]: 1800]}
*/
module.exports = function (queryParams) {
  var selectedFilters = {};
  // {all: {}, people: {}, objects: {}, documents:{type: ['medals', 'photograph' ]}}
  var filtersType = queryParams.filter;
  Object.keys(filtersType).forEach(function (type) {
    // {type: ['medals', 'photograph' ]}
    var filters = filtersType[type];
    Object.keys(filters).forEach(function (f) {
      if (filters[f]) {
        if (Array.isArray(filters[f])) {
          if (!selectedFilters[f]) {
            selectedFilters[f] = {};
          }
          filters[f].forEach(function (v) {
            if (!isNaN(filters[f])) {
              selectedFilters[f] = filters[f];
            } else {
              selectedFilters[f][v] = true;
            }
          });
        } else if (typeof filters[f] === 'number') {
          selectedFilters[f] = filters[f];
        }
      }
    });
  });
  return selectedFilters;
};
