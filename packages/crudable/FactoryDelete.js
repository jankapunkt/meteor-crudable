import FactoryBase from './FactoryBase'

export default class DeleteFactory extends FactoryBase {
  constructor (options) {
    super(options)
  }

  createName() {
    return this.getPrefix() + 'delete'
  }

  createValidate() {
    const idField = '_id'
    const {schema} = this.props
    const {allowAll} = this.props
    return function validate(query = {}) {
      const keys = Object.keys(query)
      if (keys.length === 0) {
        if (allowAll === true) {
          return void 0
        } else {
          throw new Meteor.Error(403, 'Permission denied to get all documents')
        }
      }

      Object.keys(query).forEach(key => {
        if (!schema[key] && key !== idField) {
          throw new Meteor.Error(400, `Parameter ${key} is invalid`)
        }
      })
    }
  }

  createRun() {
    const {collection} = this.props
    return function run(query = {}) {
      return collection.delete(query)
    }
  }
}