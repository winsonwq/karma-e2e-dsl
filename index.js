var createPattern = function(path) {
  return { pattern: path, included: true, served: true, watched: false };
};

var initDsl = function(files) {
  files.unshift(createPattern(__dirname + '/dist/karma-e2e-dsl.min.js'));
  files.unshift(createPattern(__dirname + '/bower_components/jquery/dist/jquery.min.js'));
  files.unshift(createPattern(__dirname + '/bower_components/underscore/underscore-min.js'));
};

initDsl.$inject = ['config.files'];

module.exports = {
  'framework:karma-e2e-dsl': ['factory', initDsl]
};