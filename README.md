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



