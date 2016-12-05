storehippo-nodejs-sdk
================


The preliminary version of StoreHippo SDK.


## Setup

~~~
var storehippo = require('storehippo-nodejs-sdk')({
		storename : <your-store-name>, 
		access_key : <your-access-key>,
		version: <version>
	});
~~~

##  1. to list records from an entity

~~~
var request = {
    entity : "your-entity-name"
    query  : {
       filters: "array-of-filters",
       start: "start value",
       limit: "limit-of-record",
    },
    command : "list"
}

//  "array-of-filters" == [{field : "field name", value : "field-value", operator : "operator(equal, less_than, greater_than)"}]

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  2. to add record to an entity

~~~
var request = {
    entity : "your-entity-name",
    data : "your-entity-data-object",
    command : "add"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  3. to get record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record",
    command : "get"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  4. to detete record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record",
    command : "delete"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  5. to update record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    data : "your-entity-data-object-to-be-updated",
    command : "edit"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  6. to duplicate record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    data : "to override the existing field of record",
    command : "duplicate"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  7. to list field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    command : "list"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  8. to add field data into a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    data : "your-field-data-object",
    command : "add"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  9. to get field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    fieldId : "_id_of_field_data",
    command : "get"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  10. to delete field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    fieldId : "_id_of_field_data",
    command : "delete"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  11. to update field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    fieldId : "_id_of_field_data"
    data : "your-field-data-object-to-be-updated",
    command : "edit"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  12. to duplicate field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    fieldId : "_id_of_field_data"
    data : "data to override the existing field",
    command : "duplicate"
}

storehippo.call(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~



