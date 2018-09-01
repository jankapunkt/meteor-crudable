import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

// MATCH HELPERS
const itExists = x => !!x
const itIsCollection = c => c instanceof Mongo.Collection
const itMayeBeCollection = c => c ? itIsCollection(c) : true

const itIsObject = o => !!o && typeof o === 'object' && typeof o !== 'function' && !Array.isArray(o) // should suffice
const itMayBeObject = o => o ? itIsObject(o) : true

// PRIVATE STATICS / DEFAULTS
const _prefix = 'methods'

// PRIVATE FUNCTIONS
function checkProps (props) {
  check(props, Match.Where(itExists))
  check(props.collection, Match.Where(itIsCollection))
  check(props.prefix, String)
}

/**
 * Base class to be extended by class with focus for each activity of CRUD.
 */
export default FactoryBase = class FactoryBase {
  constructor (options = {}) {
    check(options.collection, Match.Where(itMayeBeCollection))
    check(options.prefix, Match.Maybe(String))
    check(options.isPublic, Match.Maybe(Boolean))
    check(options.schema, Match.Where(itIsObject))
    check(options.allowAll, Match.Maybe(Boolean))
    check(options.mixins, Match.Where(itMayBeObject))

    this.props = {}
    this.props.collection = options.collection
    this.props.prefix = options.prefix || _prefix
    this.props.isPublic = options.isPublic || false
    this.props.allowAll = options.allowAll || false
    this.props.schema = options.schema
    this.mixins = options.mixins
  }

  create () {
    // before we create our final product
    // we want to check if all required props
    // are in the right place. Otherwise we want
    // it to throw an error here
    checkProps(this.props)

    // assembe definitions
    // using subclass methods
    const methodDefinitions = {}
    methodDefinitions.name = this.createName()
    methodDefinitions.validate = this.createValidate()
    methodDefinitions.run = this.createRun()

    return Object.assign({}, this.props, this.mixins, methodDefinitions)
  }

  createName () {
    throw new Error('Override this function')
  }

  createValidate () {
    throw new Error('Override this function')
  }

  createRun () {
    throw new Error('Override this function')
  }

  // /////////////////////////////////////////////////////////////////////////
  // COLLECTION
  // /////////////////////////////////////////////////////////////////////////

  setCollection (value) {
    check(value, Match.Where(itIsCollection))
    this.props.collection = value
  }

  getCollection () {
    return this.props.collection
  }

  // /////////////////////////////////////////////////////////////////////////
  // PREFIX
  // /////////////////////////////////////////////////////////////////////////

  setPrefix (value) {
    check(value, String)
    this.props.prefix = value
  }

  getPrefix () {
    return this.props.prefix
  }

  getMethodPrefix () {
    const collectionName = this.props.collection._name
    if (!collectionName) {
      throw new Error('No Collection name found')
    }
    const {prefix} = this.props
    if (prefix && prefix.length > 0) {
      return `${prefix}.${collectionName}.`
    } else {
      return `${collectionName}.`
    }
  }
}