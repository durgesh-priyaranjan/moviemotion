;var mmSocket = angular.module('mm.socketServices', []);


/**
 * Angular service to handle SailsJs sockets.
 *
 * @author David Tobin - Github: DavidTobin
 
 * @return {object} Object of methods
 */
mmSocket.factory('$socket', [
    '$q',
    '$rootScope',
    function($q, $rootScope) {
        var $cache = {},

            /**
             * Sends get request
             *
             * Use cache=true on additional object to force use of caching
             *
             * @param url {string} Url of item to be read
             * @param additional {object} Object of additional data to be past with the request
             **/
            get = function(url, additional) {
                var events,
                    defer = new $q.defer(),
                    additional = additional || {};

                // Should we fallback to cache?
                additional.cache = additional.cache || false;

                if ($cache[url] && additional.cache) {
                    defer.resolve($cache[url]);
                } else {
                    delete additional.cache;

                    io.socket.request(url, additional, function(res) {
                        // Update cache
                        $cache[url] = res;

                        defer.resolve(res);
                    });
                }

                return defer.promise
            },

            /**
             * Handles event listening for socket messages
             *
             * @param what {string} Event to listen for
             * @param callback {function} Callback for message
             **/
            on = function(what, callback) {
                io.socket.on(what, function() {
                    var args = arguments;

                    $rootScope.$apply(function() {
                        callback.apply(window.socket, args);
                    });
                });
            },

            /**
             * Sends post request
             *
             * @param url {string} Url of item to be created
             * @param data {object} Data to send with request
             * @param cb {function} Callback function to handle response
             **/
            post = function(url, data, cb) {
                io.socket.post(url, data, cb);
            },

            /**
             * Sends put request
             *
             * @param url {string} Url of item to be updated
             * @param data {object} Data to send with request
             * @param cb {function} Callback function to handle response
             **/
            put = function(url, data, cb) {
                io.socket.put(url, data, cb);
            },

            /**
             * Sends delete request
             *
             * @param url {string} Url of item to be deleted
             * @param cb {function} Callback function to handle response
             **/
            remove = function(url, cb) {
                io.socket.delete(url, cb);
            },

            /**
             * Handles socket message, allowing for live updating.
             *
             * @param model {string} Model to listen to
             * @param res {object} Response from $socket.on() callback
             * @param $scope {object} Scope to update data on
             **/
            handleMessage = function(model, res, $scope) {
                if (res.model === model) {
                    if (res.verb === 'create') {
                        $scope.push(res.data);
                    }

                    if (res.verb === 'update') {
                        var keys = Object.keys(res.data);
                        for (var i = 0; i < $scope.length; i++) {
                            if ($scope[i].id === res.id) {
                                for (var j = 0; j < keys.length; j++) {
                                    $scope[i][keys[j]] = res.data[keys[j]];
                                }
                            }
                        }
                    }

                    if (res.verb === 'destroy') {
                        for (var i = 0; i < $scope.length; i++) {
                            if ($scope[i].id === res.id) {
                                $scope.splice(i, 1);
                            }
                        }
                    }
                }
            };

        return {
            get: get,
            on: on,
            post: post,
            put: put,
            remove: remove,
            handleMessage: handleMessage
        }
    }
]);