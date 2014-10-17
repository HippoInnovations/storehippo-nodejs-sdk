storehippo-nodejs-sdk
================


To access the storehippo api of any store by using access key

## Setup

~~~
var storehippoSdk = require('storehippo-nodejs-sdk')({
		storename : <your-store-name>, 
		access_key : <your-access-key>
	});
~~~

##  1. to list record from an entity

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

storehippoSdk.list(request, function(err, response){
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

storehippoSdk.add(request, function(err, response){
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

storehippoSdk.get(request, function(err, response){
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

storehippoSdk.del(request, function(err, response){
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

storehippoApi.update(request, function(err, response){
    if(err) throw err;
    console.log(response);
})
~~~



