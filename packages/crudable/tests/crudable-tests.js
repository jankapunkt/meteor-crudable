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

})