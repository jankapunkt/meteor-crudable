import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const TestCollection = new Mongo.Collection('testcollection')

const schema = {
  title: String,
  description: String
}
TestCollection.attachSchema(new SimpleSchema(schema))
TestCollection.schema = schema
