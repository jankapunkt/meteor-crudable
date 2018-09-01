# meteor-crudable
Configure and create CRUD methods for your collections.

Example (server)

```javascript
const TestCollection = new Mongo.Collection('testcollection')

const options = {
  
  // the collection for which
  // you will generate CRUD methods
  collection: TestCollection,
  
  // a prefix for your method names
  // that will be used for generating
  prefix: 'crudable.methods',
  
  // a schema as plain object
  // no SimpleSchema instance, as
  // there is no dependency implied.
  schema: {
    title: String,
    description: String
  },
  
  // set to false to prevent {} queries
  // on operations
  allowAll: false,
  
  // pass through to 
  // ValidatedMethod constructor
  mixins: {
    roles: ['manageCollection'],
    requireAuth: true,
  },

  // action specific overrides
  read: {
    isPublic: true,
    allowAll: true
  }
}


// get CRUD methods
const methods = Crudable.from(options, true)
```

THe created object is a set of the four actions (CRUD) which each can be passed to the constructor
of `ValidatedMethod`.

```javascript
// create
{ 
  collection: [object Object],
  schema: { 
    title: [Function: String], 
    description: [Function: String]
  },
  prefix: 'crudable.methods',
  isPublic: false,
  allowAll: false,
  roles: [ 'manageCollection' ],
  requireAuth: true,
  name: 'crudable.methods.testcollection.create',
  validate: [Function: validate],
  run: [Function: run] 
}

// read
{ 
  collection: [object Object],
  schema: { 
    title: [Function: String], 
    description: [Function: String]
  },
  prefix: 'crudable.methods',
  isPublic: true,
  allowAll: true,
  roles: [ 'manageCollection' ],
  requireAuth: true,
  name: 'crudable.methods.testcollection.read',
  validate: [Function: validate],
  run: [Function: run] 
}

// update
{ 
  collection: [object Object],
  schema: { 
    title: [Function: String], 
    description: [Function: String]
  },
  prefix: 'crudable.methods',
  isPublic: false,
  allowAll: false,
  roles: [ 'manageCollection' ],
  requireAuth: true,
  name: 'crudable.methods.testcollection.update',
  validate: [Function: validate],
  run: [Function: run] 
}

// delete
{ 
  collection: [object Object],
  schema: { 
    title: [Function: String], 
    description: [Function: String]
  },
  prefix: 'crudable.methods',
  isPublic: false,
  allowAll: false,
  roles: [ 'manageCollection' ],
  requireAuth: true,
  name: 'crudable.methods.testcollection.delete',
  validate: [Function: validate],
  run: [Function: run] 
}
```

Note, that `validate` is affected by `schema`, `allowAll` or `isPublic`. 