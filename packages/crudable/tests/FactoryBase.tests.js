/* global describe it assert */
import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import { Crudable } from 'meteor/jkuester:crudable'

const FactoryBase = Crudable.factories.base

describe(FactoryBase.name, function () {

  describe('constructor', function () {
    it('can be created without options', function () {
      const instance = new FactoryBase()
      assert(instance instanceof FactoryBase)
    })
  })

  describe('overrides', function () {

    ['createName', 'createValidate', 'createRun'].forEach(key => {
      it(`throws on ${key}`, function () {
        const instance = new FactoryBase()
        assert.throws(function () {
          instance[key].call(instance)
        }, /override this function/i)
      })
    })
  })

  describe('get/set prefix', function () {

    it('throws if param is not a string', function f () {
      const instance = new FactoryBase()

      assert.throws(function () {
        instance.setPrefix()
      })
      assert.throws(function () {
        instance.setPrefix(null)
      })
      assert.throws(function () {
        instance.setPrefix(Crudable)
      })
      assert.throws(function () {
        instance.setPrefix([])
      })
      assert.throws(function () {
        instance.setPrefix(1)
      })
    })

    it ('has a default prefix', function () {
      const instance = new FactoryBase()
      assert.isDefined(instance.getPrefix())
      assert.notEqual(instance.getPrefix().length, 0)
    })

    it ('allows to set a prefix', function () {
      const instance = new FactoryBase()
      const before = instance.getPrefix()
      const newPrefix = Random.id()
      instance.setPrefix(newPrefix)
      assert.isDefined(instance.getPrefix())
      assert.notEqual(instance.getPrefix().length, 0)
      assert.notEqual(instance.getPrefix(), before)
      assert.equal(instance.getPrefix(), newPrefix)
    })
  })

  describe('get/set collection', function () {

    it('throws if param is not a collection', function () {
      const instance = new FactoryBase()

      assert.throws(function () {
        instance.setCollection()
      })
      assert.throws(function () {
        instance.setCollection(null)
      })
      assert.throws(function () {
        instance.setCollection(Crudable)
      })
      assert.throws(function () {
        instance.setCollection([])
      })
      assert.throws(function () {
        instance.setCollection(1)
      })
    })
    it('allows to set a collection', function () {
      const instance = new FactoryBase()
      const randomCollection = new Mongo.Collection(Random.id(10))
      assert.notEqual(instance.getCollection(), randomCollection)

      instance.setCollection(randomCollection)
      assert.equal(instance.getCollection(), randomCollection)
    })

  })

  describe('create', function () {

    it('throws an error if no collection is set', function () {
      const instance = new FactoryBase()
      assert.throws(function () {
        instance.create()
      })
    })
  })
})