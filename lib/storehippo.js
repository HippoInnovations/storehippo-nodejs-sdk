function StorehippoSDK(config) {
    if (!(this instanceof StorehippoSDK)) return new StorehippoSDK(config);

    if (!config) {
        var msg = "Storehippo-nodejs-sdk module expects a config object";
        throw new Error(msg);
    }

    if (!config.storename || !config.access_key) {
        var msg = "Storehippo-nodejs-sdk module config obj is invalid";
        throw new Error(msg);
    }

    this.config = config;
    var self = this;

    self.base_url = 'http://' + config.storename + '.storehippo.com';

    var isValidMongoid = function (id) {
        if (id && typeof id == 'string') {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            return checkForHexRegExp.test(id);
        } else {
            return false;
        }
    }

    var requestValidation = function (req, command) {
        if (!req.entity) {
            return {status: 400, data: 'Request must contain the entity name'}
        }

        if (command == 'get' || command == 'edit' || command == 'delete' || command == 'duplicate' || (req.field && command == 'list')) {
            if (!req.recordId) {
                return {status: 400, data: 'Request must contain the recordId'}
            } else {
                if (!isValidMongoid(req.recordId)) {
                    return {status: 400, data: 'Request recordId is not valid id'}
                }
            }
        }
        if (req.field) {
            if (command == 'get' || command == 'edit' || command == 'delete' || command == 'duplicate') {
                if (!req.fieldId) {
                    return {status: 400, data: 'Request must contain the fieldId'}
                } else {
                    if (!isValidMongoid(req.fieldId)) {
                        return {status: 400, data: 'Request fieldId is not valid id'}
                    }
                }
            }
        }
        return null;
    }


    var request = require('request');

    self.call = function (command, req, cb) {
        req.command = command;
        if (!req.command) {
            return cb({status: 400, data: 'Please specify the command name'});
        }

        if (typeof command != 'string') {
            return cb({status: 400, data: 'Command name must be string'});
        }

        var output = requestValidation(req, command);
        if (output) {
            return cb(output, null);
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
                return cb({status: 400, data: command + " is not supported on field"});
            }
        }


        var options = {
            url: self.base_url + url,
            headers: {}
        }
        options.headers['access-key'] = self.config.access_key;

        if (command == 'get' || command == 'list' || command == 'add' || command == 'edit' || command == 'delete' || command == 'duplicate') {
            if (command == 'list') {
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
            }

            if (command == 'duplicate') {
                options.method = 'PUT';
                options.headers['content-type'] = 'application/json';
                options.body = {data: req.data};
            }
        } else {
            options.method = 'PUT';
            options.qs = req.query;
            options.headers['content-type'] = 'application/json';
            options.body = {data: req.data};
        }

        if (options.body) {
            options.body = JSON.stringify(options.body);
        }

        request(options, function (err, response, body) {
            if (err) {
                cb({status: 403, data: 'Something went wrong'});
            } else {
                cb(null, {status: response.statusCode, data: body});
            }
        })
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
}

module.exports = StorehippoSDK;






