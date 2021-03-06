module.exports = [{
  filter: {
    exists: {field: 'locations'}
  },
  weight: 10
}, {
  filter: {
    exists: {field: 'options.option1'}
  },
  weight: 1.2
}, {
  filter: {
    exists: {field: 'note'}
  },
  weight: 1.2
}, {
  filter: {
    exists: {field: 'lifecycle.birth.date'}
  },
  weight: 1.2
}, {
  filter: {
    exists: {field: 'lifecycle.death.date'}
  },
  weight: 1.2
}, {
  filter: {
    term: {'type.base': 'archive'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'level.value': 'fonds'}
  },
  weight: 6
}, {
  filter: {
    exists: {field: 'multimedia.processed'}
  },
  weight: 5
}, {
  filter: {
    term: {'categories.value': 'SCM - Art'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'categories.value': 'NRM - Railway Models'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'categories.value': 'NRM - Photographs'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'categories.value': 'NRM - Railway Posters, Notices & Handbills'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'categories.value': 'NRM - Pictorial Collection (Railway)'}
  },
  weight: 0.8
}, {
  filter: {
    term: {'categories.value': 'NRM - Documents'}
  },
  weight: 0.8
}];
