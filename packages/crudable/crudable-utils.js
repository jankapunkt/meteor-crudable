import { Mongo } from 'meteor/mongo'

export const itExists = x => typeof x !== 'undefined' && x !== null

export const itIsCollection = c => c instanceof Mongo.Collection

export const itMayeBeCollection = c => itExists(c) ? itIsCollection(c) : true

export const itIsObject = o => itExists(o) && typeof o === 'object' && typeof o !== 'function' && !Array.isArray(o)

export const itMayBeObject = o => itExists(o) ? itIsObject(o) : true
