module.exports = function (elastic, index, cb) {
  elastic.indices.getMapping({
    index: index
  }, function (error, response) {
    return cb(error, response);
  });
};
