import FactoryBase from './FactoryBase'
import CreateFactory from './FactoryCreate'
import ReadFactory from './FactoryRead'
import UpdateFactory from './FactoryUpdate'
import DeleteFactory from './FactoryDelete'

/**
 * Wrapper class that holds a factory for each CRUD activity.
 */
class CRUDFactory {
  constructor (options = {}) {
    if (options.isPublic) {
      console.warn('[Warning!] Crudable option "isPublic" allows method access to anyone.')
    }
    if (options.allowAll) {
      console.warn('[Warning!] Crudable option "allowAll" allows to RUD all docs  in one call (using "{}" query).')
    }
    this.c = new CreateFactory(Object.assign({}, options, options.c || options.create))
    this.r = new ReadFactory(Object.assign({}, options, options.r || options.read))
    this.u = new UpdateFactory(Object.assign({}, options, options.u || options.update))
    this.d = new DeleteFactory(Object.assign({}, options, options.d || options.delete))
  }

  create () {
    const product = {}
    product.c = this.c.create()
    product.r = this.r.create()
    product.u = this.u.create()
    product.d = this.d.create()
    return product
  }
}

export const Crudable = {}

/**
 * Keeps references to the factory classes.
 * @type {{}}
 */
Crudable.factories = {}
Crudable.factories.base = FactoryBase
Crudable.factories.crud = CRUDFactory
Crudable.factories.create = CreateFactory
Crudable.factories.read = ReadFactory
Crudable.factories.update = UpdateFactory
Crudable.factories.delete = DeleteFactory

/**
 * Create a new CRUD method definitions object for given options.
 * @param options
 * @param createNow
 * @returns {CRUDFactory|{}} Returns a new CRUDFactory if {createNow} is set to false (default), else returns the
 * newly created CRUD definitions object to be passed into ValidatedMethod.
 */
Crudable.from = function from (options, createNow) {
  const factory = new CRUDFactory(options)
  if (createNow) {
    return factory.create()
  } else {
    return factory
  }
}
