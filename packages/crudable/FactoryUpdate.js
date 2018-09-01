import { Meteor } from 'meteor/meteor'
import FactoryBase from './FactoryBase'

export default class UpdateFactory extends FactoryBase {

  createName () {
    return this.getMethodPrefix() + 'update'
  }

  createValidate () {
    const {schema} = this.props
    const {allowAll} = this.props
    return function validate (updateDoc) {
      const {query} = updateDoc
      const {modifier} = updateDoc
      const idField = '_id'

      if (!query || !modifier) {
        throw new Meteor.Error(400, 'Expected query and modifier.')
      }

      const queryKeys = Object.keys(query)
      if (queryKeys.length === 0) {
        if (allowAll !== true) {
          throw new Meteor.Error(403, 'Permission denied to update all documents.')
        }
      }

      function checkKeys (keys) {
        keys.forEach(key => {
          if (!schema[key] && key !== idField) {
            throw new Meteor.Error(400, `Parameter ${key} is invalid`)
          }
        })
      }

      checkKeys(queryKeys)
      Object.values(modifier).forEach(field => {
        checkKeys(Object.keys(field))
      })
    }
  }

  createRun () {
    const {collection} = this.props
    return function run (updateDoc) {
      const {query} = updateDoc
      const {modifier} = updateDoc
      return collection.update(query, modifier)
    }
  }
}
