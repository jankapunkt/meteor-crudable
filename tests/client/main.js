/* global AutoForm */
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'

import SimpleSchema from 'simpl-schema'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import { ReactiveDict } from 'meteor/reactive-dict'
import { TestCollection } from '../imports/api/TestCollection'
import { Definitions } from '../imports/api/Definitions'
import './main.html'

Meteor.subscribe('testcollection.all')

const docSchema = new SimpleSchema(TestCollection.schema, {tracker: Tracker})

function getName (action) {
  return `${Definitions.prefix}.${TestCollection._name}.${action}`
}

Template.hello.onCreated(function helloOnCreated () {
  const instance = this
  instance.state = new ReactiveDict()
})

Template.hello.helpers({
  docs () {
    return TestCollection.find()
  },
  currentDoc () {
    const currentId = Template.instance().state.get('currentId')
    return currentId && TestCollection.findOne(currentId)
  },
  isCurrent (id) {
    return id === Template.instance().state.get('currentId')
  },
  create () {
    return Template.instance().state.get('create')
  },
  schema () {
    return docSchema
  }
})

Template.hello.events({
  'click .create-button' (event, tInstance) {
    event.preventDefault()
    tInstance.state.set('currentId', null)
    tInstance.state.set('create', true)
  },
  'click .update-button' (event, tInstance) {
    event.preventDefault()

    const target = tInstance.$(event.currentTarget).attr('data-target')
    tInstance.state.set('currentId', target)
  },
  'click .delete-button' (event, tInstance) {
    event.preventDefault()

    if (global.confirm('really delete?')) {
      const target = tInstance.$(event.currentTarget).attr('data-target')
      const currentId = tInstance.state.get('currentId')
      if (target === currentId) {
        tInstance.state.set('currentId', null)
      }
      const name = getName('delete')
      Meteor.call(name, {_id: target}, (err, res) => {
        if (err) console.error(err)
      })
    }
  },
  'submit #createForm' (event, tInstance) {
    event.preventDefault()

    tInstance.state.set('currentId', null)

    const {insertDoc} = AutoForm.getFormValues('createForm')
    const name = getName('create')
    Meteor.call(name, insertDoc, (err, res) => {
      if (err) console.error(err)
      if (res) tInstance.state.set('create', false)
    })
  },
  'submit #updateForm' (event, tInstance) {
    event.preventDefault()

    tInstance.state.set('create', false)

    const {updateDoc} = AutoForm.getFormValues('updateForm')
    const name = getName('update')
    const _id = tInstance.state.get('currentId')
    console.log(updateDoc)
    Meteor.call(name, {query: {_id}, modifier: updateDoc}, (err, res) => {
      if (err) console.error(err)
      if (res) tInstance.state.set('currentId', null)
    })
  }
})
