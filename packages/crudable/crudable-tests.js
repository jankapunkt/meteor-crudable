// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by crudable.js.
import { name as packageName } from "meteor/jkuester:crudable";

// Write your tests here!
// Here is an example.
Tinytest.add('crudable - example', function (test) {
  test.equal(packageName, "crudable");
});
