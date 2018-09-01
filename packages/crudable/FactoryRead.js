import { Meteor } from 'meteor/meteor'
import FactoryBase from './FactoryBase'

export default class ReadFactory extends FactoryBase {

  createName () {
    return this.getMethodPrefix() + 'read'
  }

  createValidate () {
    const {schema} = this.props
    const {allowAll} = this.props
    const idField = '_id'

    return function validate (query = {}) {
      const keys = Object.keys(query)
      if (keys.length === 0) {
        if (allowAll === true) {
          return void 0
        } else {
          throw new Meteor.Error(403, 'Permission denied to get all documents')
        }
      }

      keys.forEach(key => {
        if (!schema[key] && key !== idField) {
          throw new Meteor.Error(400, `Parameter ${key} is invalid`)
        }
      })
    }
  }

  createRun () {
    const {collection} = this.props
    return function run (query = {}) {
      return collection.find(query)
    }
  }
}
