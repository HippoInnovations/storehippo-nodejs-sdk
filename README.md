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

##  10. to delete field data of a record of an entity

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


##  Other ways of calling command 

### 1. Using promises 

#### i. Request with url
~~~
var request = {
    url: '/entity/<your-entity-name>',
    data: '<data required for the command>' //JSON object
}
storehippo.call(request).then(function (success_response) {
    //perform something at time of success
}, function (error_error) {
    //perform something at time of err
});
~~~

##### Note: URL for different commands are :
 1. List - url: '/entity/your-entity-name'
 2. Get/Del/Update - url:'/entity/your-entity-name/record_id'
 3. Duplicate - url:'/entity/your-entity-name>/record_id/_duplicate'
 4. For custom command - url:'/entity/your-entity-name/_/name-of-the-custom_command'


#### ii. Request with entity name and command
~~~

var request = {
    entity: '<your-entity-name>',
    command: '<command-name>',
    data: <data for the command>,         //JSON object,
    recordId: '<id-of-the-record>'       // only in case of get, del, update and duplicate command  
}
storehippo.call(request).then(function (success_response) {
    //perform something at time of success
}, function (error_error) {
    //perform something at time of err
});

~~~

### 2. Using single request object

#### i.  Request with url

~~~


var request = {
    url: '/entity/<your-entity-name>',
    data: '<data required for the command>',    //JSON Object
    success: function (response) {
        //perform something in case of success 
    },
    error: function (response) {
        //perform something in case of error
    }
}
storehippo.call(request);
        
~~~

##### Note: URL for different commands are :
 1. List - url: '/entity/your-entity-name'
 2. Get/Del/Update - url:'/entity/your-entity-name/record_id'
 3. Duplicate - url:'/entity/your-entity-name>/record_id/_duplicate'
 4. For custom command - url:'/entity/your-entity-name/_/name-of-the-custom_command'

#### ii. Request with entity name and command

~~~
var request = {
    entity: '<your-entity-name>',
    command: '<command-name>',
    data: '<data for the command>',         //JSON object,
    recordId: '<id-of-the-record>',        // only in case of get, del, update and duplicate command  
    success: function (response) {
        //perform something in case of success 
    },
    error: function (response) {
        //perform something in case of error
    }
}
storehippo.call(request);
~~~
