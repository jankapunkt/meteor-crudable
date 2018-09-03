/* global Package */

Package.describe({
  name: 'jkuester:crudable',
  version: '1.1.0',
  // Brief, one-line summary of the package.
  summary: 'Configure and create CRUD methods and publictions for your collections.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/meteor-crudable.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.5')
  api.use('ecmascript')
  api.use('mongo')
  api.use('check')
  api.addFiles([
    'crudable-utils.js',
    'FactoryBase.js',
    'FactoryCreate.js',
    'FactoryRead.js',
    'FactoryUpdate.js',
    'FactoryDelete.js'
  ], 'server')
  api.mainModule('crudable.js', 'server')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('meteortesting:mocha@1.0.0')
  api.use('practicalmeteor:chai')
  api.use('jkuester:crudable')
  api.addFiles([
    'tests/FactoryBase.tests.js',
    'tests/FactoryCreate.tests.js',
    'tests/FactoryRead.tests.js',
    'tests/FactoryUpdate.tests.js',
    'tests/FactoryDelete.tests.js'
  ], 'server')
  api.mainModule('tests/crudable-tests.js')
})
