Package.describe({
  name: 'jkuester:crudable',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Configure and create CRUD methods and publictions for your collections.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/meteor-crudable.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5');
  api.use('ecmascript');
  api.use('mongo')
  api.use('check')
  api.addFiles([
    'FactoryBase.js',
    'FactoryCreate.js',
    'FactoryRead.js',
    'FactoryUpdate.js',
    'FactoryDelete.js',
  ], 'server')
  api.mainModule('crudable.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jkuester:crudable');
  api.mainModule('crudable-tests.js');
});
