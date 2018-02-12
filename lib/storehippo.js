function StorehippoSDK(config) {
    if (!(this instanceof StorehippoSDK)) return new StorehippoSDK(config);

    if (!config) {
        var msg = "Storehippo-nodejs-sdk module expects a config object";
        throw new Error(msg);
    }

    if (!config.storename || (!config.access_key && !config.access_token)) {
        var msg = "Storehippo-nodejs-sdk module config obj is invalid";
        throw new Error(msg);
    }

    this.config = config;
    var self = this;

    self.base_url = 'https://' + config.storename + '.storehippo.com';
    if (config.env == 'devhippo') {
        self.base_url = 'https://' + config.storename + '.devhippo.com';
    }
    if (config.env == 'betahippo') {
        self.base_url = 'https://' + config.storename + '.betahippo.com';
    }
    if (config.version) {
        self.base_url = self.base_url + '/api/' + config.version;
    }

    var shUrlCall = function (options, cb, err) {
        var Q = require('q');
        var deferred = Q.defer();
        if (err) {
            setTimeout(function () {
                deferred.reject(err);
            }, 100)
        } else {
            options.url = self.base_url + options.url;
            if (!options.headers) {
                options.headers = {};
            }
            if (options.headers && options.headers['access-key']) {
                options.headers['access-key'] = options.headers['access-key'];
            }
            else {
                options.headers['access-key'] = self.config.access_key;
            }

            if (self.config.access_token) {
                delete options.headers['access-key'];
                options.headers['Authorization'] = "Bearer " + self.config.access_token;
            }

            var request = require('request');
            options['content-type'] = 'application/json';

            var j = request.jar();
            if (self.cookies && self.cookies.length) {
                self.cookies.forEach(function (cookie) {
                    var cookie = request.cookie(cookie);
                    j.add(cookie);
                })
            }
            options.jar = j;
            request(options, function (err, response, body) {
                if (response && response.headers && response.headers['set-cookie']) {
                    self.cookies = response.headers['set-cookie'];
                }
                if (err) {
                    var error = {
                        status: 403,
                        data: err,
                        messages: [{key: 'ms.msg.bad_request', message: 'Bad Request'}]
                    };
                    sendResponse(options, error, null, cb);
                    deferred.reject(error);
                } else {
                    var response = {
                        status: response.statusCode
                    };
                    if (body) {
                        try {
                            body = JSON.parse(body);
                        } catch (e) {
                            //console.log("Error occurred in parsing response data :", e);
                            //console.log("Response : ", body);
                            sendResponse(options, error, null, cb);
                        }
                        if (body.data) {
                            response.data = body.data;
                        }
                        if (body.messages) {
                            response.messages = body.messages;
                        }
                        if (body.paging) {
                            response.paging = body.paging;
                        }
                        if (body.error) {
                            response.error = body.error;
                        }
                    }
                    sendResponse(options, null, response, cb);
                    deferred.resolve(response);
                }
            })
        }
        return deferred.promise;
    }
    var sendResponse = function (options, error, response, cb) {
        if (error) {
            if (options.error) {
                return options.error(error);
            }
            if (cb) {
                cb(error, null);
            }
        }
        if (response) {
            if (response.error) {
                if (options.error) {
                    return options.error(response);
                }
                if (cb) {
                    cb(response, null);
                }
            } else {
                if (options.success) {
                    return options.success(response);
                }
                if (cb) {
                    cb(null, response);
                }
            }
        }
    }

    var shCommandCall = function (command, req, cb) {
        req.command = command;
        var error = null;
        if (!req.command) {
            error = {status: 400, data: "Invalid Request"}
        }
        if (typeof command != 'string') {
            error = {status: 400, data: "Invalid Request"}
        }

        var url = "/entity/" + req.entity;
        if (!req.field) {
            if (command == 'get' || command == 'list' || command == 'add' || command == 'edit' || command == 'delete' || command == 'duplicate') {
                if (command == 'get' || command == 'edit' || command == 'delete' || command == 'duplicate') {
                    url += "/" + req.recordId;
                }
                if (command == 'duplicate') {
                    url += "/_duplicate";
                }
            } else {
                if (req.recordId) {
                    url += "/" + req.recordId;
                }
                url += "/_/" + req.command;
            }
        } else {
            if (command == 'get' || command == 'list' || command == 'add' || command == 'edit' || command == 'delete' || command == 'duplicate') {
                url = "/entity/" + req.entity + "/" + req.recordId + "/" + req.field;
                if (command == 'get' || command == 'edit' || command == 'delete' || command == 'duplicate') {
                    url += "/" + req.fieldId;
                }
                if (command == 'duplicate') {
                    url += "/_duplicate";
                }
            } else {
                error = {status: 400, data: "Invalid Request"}
            }
        }
        var options = {
            url: url,
            headers: {}
        }
        if (command == 'get' || command == 'list' || command == 'add' || command == 'edit' || command == 'delete' || command == 'duplicate') {
            if (command == 'list' || command == 'get') {
                options.qs = req.query;
            }
            if (command == 'add') {
                options.method = 'POST';
                options.headers['content-type'] = 'application/json';
                options.body = {data: req.data};
            }
            if (command == 'edit') {
                options.method = 'PUT';
                options.headers['content-type'] = 'application/json';
                options.body = {data: req.data};
            }
            if (command == 'delete') {
                options.method = 'DELETE';
                if (req.data) {
                    options.headers['content-type'] = 'application/json';
                    options.body = {data: req.data};
                }
            }

            if (command == 'duplicate') {
                options.method = 'PUT';
                options.headers['content-type'] = 'application/json';
                options.body = {data: req.data};
            }
        } else {
            options.method = 'PUT';
            options.headers['content-type'] = 'application/json';
            options.body = {data: req.data};
        }
        options.qs = req.query;
        if (options.body) {
            options.body = JSON.stringify(options.body);
        }
        if (req.headers && req.headers['access-key']) {
            options.headers['access-key'] = req.headers['access-key'];
        }
        if (req.headers && req.headers['backend']) {
            options.headers['backend'] = req.headers['backend'];
        }
        return shUrlCall(options, cb);
    }

    self.call = function (command, req, cb) {
        if (typeof command == 'string') {
            return shCommandCall(command, req, cb);
        }
        if (typeof command == 'object') {
            cb = req;
            req = command;
            if (req.url) {
                return shUrlCall(req, cb);
            } else {
                if (req.command) {
                    return shCommandCall(req.command, req, cb);
                }
            }
        } else {
            return shUrlCall(req, cb, {status: 400, data: "Invalid Request"})
        }
    }
    self.list = function (req, next) {
        if (!req.query) {
            req.query = {};
        }
        self.call("list", req, next);
    }
    self.get = function (req, next) {
        self.call("get", req, next);
    }
    self.add = function (req, next) {
        self.call("add", req, next);
    }
    self.update = function (req, next) {
        self.call("edit", req, next);
    }
    self.del = function (req, next) {
        self.call("delete", req, next);
    }
    self.duplicate = function (req, next) {
        self.call("duplicate", req, next);
    }
    self.upload = function (req, next) {
        var options = {
            headers: {
                'content-type': 'application/json'
            },
            url: 'https://files.storehippo.com/fileUpload',
            body: req.data ? req.data : req,
            json: true,
            method: "POST"
        }
        if (req.headers && req.headers['access-key']) {
            options.headers['access-key'] = req.headers['access-key'];
        }
        else {
            options.headers['access-key'] = self.config.access_key;
        }
        if (self.config.access_token) {
            delete options.headers['access-key'];
            options.headers['Authorization'] = "Bearer " + self.config.access_token;
        }
        var request = require('request');
        request(options, function (err, response, body) {
                console.log(err, body)
                if (err) {
                    next(err, null);
                }
                else if (body && body.errorMessage) {
                    next({status: 406, data: body.errorMessage, message: body.errorMessage}, null)
                }
                else if (body && body.fileUrl) {
                    next(null, {status: body.statusCode, fileUrl: body.fileUrl})
                }
                else {
                    next(err, body)
                }
            }
        )
    }

}

module.exports = StorehippoSDK;
