import { Meteor } from 'meteor/meteor';
import {Crudable} from 'meteor/jkuester:crudable'
import {ValidatedMethod} from 'meteor/mdg:validated-method'

const collection = new Mongo.Collection('testcollection')

Meteor.startup(() => {
  const options = {
    collection,
    prefix: 'crudable.methods.',
    schema: {
      title: String,
      description: String
    },
    allowAll: true,
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
    console.log(definitions)
    new ValidatedMethod(definitions)
  })
});
