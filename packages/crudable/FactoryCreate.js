import { Meteor } from 'meteor/meteor'
import FactoryBase from './FactoryBase'

export default class CreateFactory extends FactoryBase {

  createName () {
    return this.getMethodPrefix() + 'create'
  }

  createValidate () {
    const {schema} = this.props
    return function validate (insertDoc) {
      if (!insertDoc) {
        throw new Meteor.Error(400, 'Expected insert document')
      }

      const keys = Object.keys(insertDoc)
      keys.forEach(key => {
        if (!schema[key]) {
          throw new Meteor.Error(400, `Parameter ${key} is invalid`)
        }
      })
    }
  }

  createRun () {
    const {collection} = this.props
    return function run (insertDoc) {
      return collection.insert(insertDoc)
    }
  }
}
