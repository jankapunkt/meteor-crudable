/* global describe it assert */
import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import { Crudable } from 'meteor/jkuester:crudable'

describe('Crudable API', function () {

  const factories = [
    {prop: 'crud', name: 'CRUDFactory'},
    {prop: 'base', name: 'FactoryBase'},
    {prop: 'create', name: 'CreateFactory'},
    {prop: 'read', name: 'ReadFactory'},
    {prop: 'update', name: 'UpdateFactory'},
    {prop: 'delete', name: 'DeleteFactory'},
  ]

  describe('factories', function () {

    factories.forEach(definition => {
      it(`has a reference to ${definition.name}`, function () {
        assert.isDefined(Crudable.factories[definition.prop])
        assert.equal(Crudable.factories[definition.prop].name, definition.name)
      })
    })

  })

  describe('from', function () {

    it('returns a new instance of CRUDFactory by default', function () {
      const factory = Crudable.from()
      assert.isTrue(factory instanceof Crudable.factories.crud)
    })

    it('returns a product if createNew is set to true', function () {
      const TestCollection = new Mongo.Collection(Random.id(10))
      const product = Crudable.from({collection: TestCollection}, true)
      assert.isFalse(product instanceof Crudable.factories.crud)
    })
  })

  describe('utils', function () {

    it('has all named functions', function () {
      Object.keys(Crudable.utils).forEach(key => {
        const fct = Crudable.utils[key]
        assert.equal(key, fct.name)
      })
    })

    it(Crudable.utils.itExists.name, function () {
      assert.isTrue(Crudable.utils.itExists(1))
      assert.isTrue(Crudable.utils.itExists(''))
      assert.isTrue(Crudable.utils.itExists('hello world'))
      assert.isTrue(Crudable.utils.itExists([]))
      assert.isTrue(Crudable.utils.itExists({}))

      assert.isFalse(Crudable.utils.itExists())
      assert.isFalse(Crudable.utils.itExists(void 0))
      assert.isFalse(Crudable.utils.itExists(null))
      assert.isFalse(Crudable.utils.itExists(Crudable.fantasyProp))

    })

    const testIsObject = function testIsObject(fct) {
      assert.isTrue(fct({}))
      assert.isTrue(fct(Crudable))

      assert.isFalse(fct([]))
      assert.isFalse(fct(() => {}))
      assert.isFalse(fct(function () {}))
      assert.isFalse(fct(''))
      assert.isFalse(fct(1))
    }

    it (Crudable.utils.itIsObject.name, function () {
      testIsObject(Crudable.utils.itIsObject)
    })

    it (Crudable.utils.itMayBeObject.name, function () {
      testIsObject(Crudable.utils.itMayBeObject)
      assert.isTrue(Crudable.utils.itMayBeObject())
      assert.isTrue(Crudable.utils.itMayBeObject(void 0))
      assert.isTrue(Crudable.utils.itMayBeObject(null))
    })

    it (Crudable.utils.itIsCollection.name, function () {
      const randomCollection = new Mongo.Collection(Random.id(10))
      assert.isTrue(Crudable.utils.itIsCollection(randomCollection))

      assert.isFalse(Crudable.utils.itIsCollection())
      assert.isFalse(Crudable.utils.itIsCollection(void 0))
      assert.isFalse(Crudable.utils.itIsCollection(null))
      assert.isFalse(Crudable.utils.itIsCollection(''))
      assert.isFalse(Crudable.utils.itIsCollection(1))
      assert.isFalse(Crudable.utils.itIsCollection([]))
      assert.isFalse(Crudable.utils.itIsCollection({}))
      assert.isFalse(Crudable.utils.itIsCollection(Crudable))
    })

    it (Crudable.utils.itMayeBeCollection.name, function () {
      const randomCollection = new Mongo.Collection(Random.id(10))
      assert.isTrue(Crudable.utils.itMayeBeCollection(randomCollection))
      assert.isTrue(Crudable.utils.itMayeBeCollection())
      assert.isTrue(Crudable.utils.itMayeBeCollection(void 0))
      assert.isTrue(Crudable.utils.itMayeBeCollection(null))

      assert.isFalse(Crudable.utils.itMayeBeCollection(''))
      assert.isFalse(Crudable.utils.itMayeBeCollection(1))
      assert.isFalse(Crudable.utils.itMayeBeCollection([]))
      assert.isFalse(Crudable.utils.itMayeBeCollection({}))
      assert.isFalse(Crudable.utils.itMayeBeCollection(Crudable))
    })
  })

})