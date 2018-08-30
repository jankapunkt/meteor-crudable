import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

// MATCH HELPERS
const itExists = x => !!x
const itIsCollecton = c => !!c && c instanceof Mongo.Collection

const itIsObject = o => !!o && typeof o === 'object' && typeof o !== 'function' && !Array.isArray(o) // should suffice
const itMayBeObject = o => o ? itIsObject(o) : true

// PRIVATE STATICS / DEFAULTS
const _prefix = 'methods'

// PRIVATE FUNCTIONS
function checkProps (props) {
  check(props, Match.Where(itExists))
  check(props.collection, Match.Where(itIsCollecton))
  check(props.prefix, String)
}

export default FactoryBase = class FactoryBase {
  constructor (options) {
    check(options, Match.Where(itExists))
    check(options.collection, Match.Where(itIsCollecton))
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

    const product = Object.assign({}, this.props, this.mixins)
    product.name = this.createName()
    product.validate = this.createValidate()
    product.run = this.createRun()
    return product
  }

  createName() {
    throw new Error('Override this function')
  }

  createValidate() {
    throw new Error('Override this function')
  }

  createRun() {
    throw new Error('Override this function')
  }

  // /////////////////////////////////////////////////////////////////////////
  // COLLECTION
  // /////////////////////////////////////////////////////////////////////////

  setCollection (value) {
    check(value, Match.Where(itIsCollecton))
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
    const collectionName = this.props.collection.name
    const value = this.props.prefix
    if (value && value.length > 0) {
      return `${value}.${collectionName}.`
    } else {
      return `${collectionName}.`
    }
  }
}