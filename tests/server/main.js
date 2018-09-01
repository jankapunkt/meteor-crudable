import { Meteor } from 'meteor/meteor'
import { Crudable } from 'meteor/jkuester:crudable'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { TestCollection } from '../imports/api/TestCollection'
import { Definitions } from '../imports/api/Definitions'

Meteor.publish('testcollection.all', function () {
  return TestCollection.find()
})

Meteor.startup(() => {
  const options = {
    collection: TestCollection,
    prefix: Definitions.prefix,
    schema: TestCollection.schema,
    allowAll: false,
    mixins: {
      roles: ['manageCollection'],
      requireAuth: true,
    },

    // action specific
    read: {
      isPublic: true
    }
  }

  const methods = Crudable.from(options, true)
  Object.values(methods).forEach(definitions => {
    const method = new ValidatedMethod(definitions)
    console.info(`[methods] registered method [${method.name}]`)
  })
})
