module.exports = (elastic, config) => ([
  require('./home')(),
  require('./search')(elastic, config),
  require('./public')(),
  require('./archive')(elastic, config),
  require('./object')(elastic, config),
  require('./person')(elastic, config),
  require('./autocomplete')(elastic, config),
  require('./sitemap')(config),
  require('./analytics')(),
  require('./museum').scm(),
  require('./museum').msi(),
  require('./museum').nmem(),
  require('./museum').nrm(),
  require('./api')(elastic, config),
  require('./object-id')(elastic, config),
  require('./robot')()
]);
