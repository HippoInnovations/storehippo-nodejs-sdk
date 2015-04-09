storehippo-nodejs-sdk
================


The preliminary version of StoreHippo SDK.


## Setup

~~~
var storehippo = require('storehippo-nodejs-sdk')({
		storename : <your-store-name>, 
		access_key : <your-access-key>
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
    }
}

//  "array-of-filters" == [{field : "field name", value : "field-value", operator : "operator(equal, less_than, greater_than)"}]

storehippo.list(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  2. to add record to an entity

~~~
var request = {
    entity : "your-entity-name",
    data : "your-entity-data-object"
}

storehippo.add(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  3. to get record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
}

storehippo.get(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  4. to detete record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
}

storehippo.del(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  5. to update record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    data : "your-entity-data-object-to-be-updated"
}

storehippo.update(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  6. to duplicate record from an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    data : "to override the existing field of record"
}

storehippo.duplicate(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  7. to list field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name"
}

storehippo.list(request, function(err, response){
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
    data : "your-field-data-object"
}

storehippo.add(request, function(err, response){
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
    fieldId : "_id_of_field_data"
}

storehippo.get(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~

##  10. to detete field data of a record of an entity

~~~
var request = {
    entity : "your-entity-name"
    recordId : "_id-of-record"
    field : "field_name",
    fieldId : "_id_of_field_data"
}

storehippo.del(request, function(err, response){
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
    data : "your-field-data-object-to-be-updated"
}

storehippo.update(request, function(err, response){
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
    data : "data to override the existing field"
}

storehippo.duplicate(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~



