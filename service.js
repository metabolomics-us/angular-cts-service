/**
 * Created by Gert on 6/24/2014.
 */

'use strict';

angular.module('wohlgemuth.cts', []).
    config(function ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }).
    //constant('CTSURL', 'http://www.corsproxy.com/cts.fiehnlab.ucdavis.edu').
    constant('CTSURL', 'http://127.0.0.1:9292/cts.fiehnlab.ucdavis.edu').

    factory(
    "transformRequestAsFormPost",
    function () {

// I prepare the request data for the form post.
        function transformRequest(data, getHeaders) {

            var headers = getHeaders();

            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";

            return( serializeData(data) );

        }


// Return the factory value.
        return( transformRequest );


// ---
// PRVIATE METHODS.
// ---


// I serialize the given Object into a key-value pair string. This
// method expects an object and will default to the toString() method.
// --
// NOTE: This is an atered version of the jQuery.param() method which
// will serialize a data collection for Form posting.
// --
// https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData(data) {

// If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {

                return( ( data == null ) ? "" : data.toString() );

            }

            var buffer = [];

// Serialize each key in the object.
            for (var name in data) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                        encodeURIComponent(name) +
                        "=" +
                        encodeURIComponent(( value == null ) ? "" : value)
                );

            }

// Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join("&")
                    .replace(/%20/g, "+")
                ;

            return( source );

        }

    }
)

/**
 * provides us with access to the general cts service
 */
    .service('gwCtsService', function ($http, CTSURL, $log,transformRequestAsFormPost) {

        /**
         * returns all known names for the given InChIKey
         * @param inchiKey
         * @param callback
         * @param errorCallback
         */
        this.getNamesForInChIKey = function (inchiKey, callback, errorCallback) {
            $http.defaults.useXDomain = true;

            $http.get(CTSURL + '/service/convert/InChIKey/Chemical%20Name/' + inchiKey).then(function (data) {
                if (angular.isDefined(data.data)) {
                    data = data.data;

                    if (angular.isArray(data)) {
                        if (data.length > 0) {
                            data = data[0];
                            if (angular.isDefined(data.result)) {
                                var names = [];

                                for(var i = 0; i < data.result.length; i++){
                                    names.push({name:data.result[i]});
                                }
                                callback(names);
                            }
                        }
                    }
                }
            }).catch(function (error) {
                if (angular.isDefined(errorCallback)) {
                    errorCallback(error);
                }
                else {
                    $log.warn(error);
                }
            });
        };

        /**
         * converts the given Molecule to an InChI Key
         * @param molecule
         * @param callback
         * @param errorCallback
         */
        this.convertToInchiKey = function (molecule, callback, errorCallback) {
            $http({
                    method: "post",
                    url: CTSURL + '/service/molToInchi/',
                    transformRequest: transformRequestAsFormPost,
                    data: {
                        mol: molecule
                    }
                }
            ).success(function (data) {

                    //$log.debug('received: ' + data);

                    if (angular.isDefined(data)) {

                        if (angular.isDefined(data.error)) {
                            if (angular.isDefined(errorCallback)) {
                                errorCallback(data.error);
                            }
                            else {
                                $log.warn('error: ' + error);
                            }
                        }
                        else if (angular.isDefined(data.inchikey)) {
                            if (data.inchikey === "") {
                                callback(null);
                            }
                            else {
                                callback(data);
                            }
                        }

                    }
                    else{
                        $log.debug('no data object is defined!');
                    }
                }).catch(function (error) {
                    if (angular.isDefined(errorCallback)) {
                        errorCallback(error);
                    }
                    else {
                        $log.warn(error);
                    }
                });
        };

        /**
         * converts an InChI Key to a molecule
         * @param inchiKey
         * @param callback
         * @param errorCallback
         */
        this.convertInchiKeyToMol = function (inchiKey, callback, errorCallback) {
            $http.get(CTSURL + '/service/inchikeytomol/' + inchiKey).then(function (data) {
                if (angular.isDefined(data.data)) {

                    data = data.data;
                    if (angular.isDefined(data.error)) {
                        if (angular.isDefined(errorCallback)) {
                            errorCallback(data.error);
                        }
                        else {
                            $log.warn('error: ' + error);
                        }
                    }
                    else if (angular.isDefined(data.molecule)) {
                        if (data.molecule === "") {
                            callback(null);
                        }
                        else {
                            callback(data.molecule);
                        }
                    }

                }
            }).catch(function (error) {
                if (angular.isDefined(errorCallback)) {
                    errorCallback(error);
                }
                else {
                    $log.warn('error:' + error);
                }
            });
        };
    }).


/**
 * provides us with access to the chemify service
 */
    service('gwChemifyService', function ($http, CTSURL, $log) {

        /**
         * converts the given name to an InChI Key
         * @param chemicalName
         * @param callback
         */
        this.nameToInChIKey = function (chemicalName, callback, errorCallback) {
            $http.defaults.useXDomain = true;

            $http.get(CTSURL + '/chemify/rest/identify/' + encodeURI(chemicalName)).then(function (data) {
                var result = "";

                if (angular.isDefined(data.data)) {
                    data = data.data;
                    if (angular.isArray(data)) {
                        if (data.length > 0) {
                            var topHit = data[0];
                            if (angular.isDefined(topHit.result)) {
                                if (topHit.result === 'nothing found') {
                                    callback(null);
                                }
                                else {
                                    callback(topHit.result);
                                }
                            }
                        }
                    }
                }
            }).catch(function (error) {
                if (angular.isDefined(errorCallback)) {
                    errorCallback(error);
                }
                else {
                    $log.warn(error);
                }
            });
        }
    });
