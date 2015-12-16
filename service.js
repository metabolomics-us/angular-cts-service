/**
 * Created by Gert on 6/24/2014.
 */

(function () {
	'use strict';

	angular.module('wohlgemuth.cts', [])
		.config(['$httpProvider', function ($httpProvider) {
			//Enable cross domain calls
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}])

		//.constant('CTSURL', 'http://192.168.59.103/')
		.constant('CTSURL', 'http://cts.fiehnlab.ucdavis.edu')

		.factory("transformRequestAsFormPost", transformRequestAsFormPost)

		.service('gwCtsService', gwCtsService)

		.service('gwChemifyService', gwChemifyService);


	/*** Function Declerations **/

	function transformRequestAsFormPost() {
		function transformRequest(data, getHeaders) {
			var headers = getHeaders();
			headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";

			return (serializeData(data));
		}

		function serializeData(data) {
			if (!angular.isObject(data)) {
				return ( ( data == null ) ? "" : data.toString() );
			}

			var buffer = [];

			for (var name in data) {
				if (!data.hasOwnProperty(name)) {
					continue;
				}

				var value = data[name];
				buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(( value == null ) ? "" : value));
			}

			var source = buffer.join("&").replace(/%20/g, "+");

			return (source);
		}

		return (transformRequest);
	}


	/**
	 * provides us with access to the general cts service
	 */
	function gwCtsService($http, CTSURL, $log, transformRequestAsFormPost) {
		$http.defaults.useXDomain = true;

		/**
		 * returns all known names for the given InChIKey
		 * @param inchiKey
		 * @param callback
		 * @param errorCallback
		 */
		this.getNamesForInChIKey = function (inchiKey, callback, errorCallback) {

			$http.get(CTSURL + '/rest/convert/InChIKey/Chemical%20Name/' + inchiKey).then(function (data) {
				if (angular.isDefined(data.data)) {
					data = data.data;

					if (angular.isArray(data)) {
						if (data.length > 0) {
							data = data[0];
							if (angular.isDefined(data.result)) {
								var names = [];

								for (var i = 0; i < data.result.length; i++) {
									names.push({name: data.result[i]});
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
					if (error != null) {
						$log.warn('error: ' + error);
					}
					else {
						$log.warn("no error message provided!");
					}
				}
			});
		};

		/**
		 * returns all known names for the given InChIKey
		 * @param inchiKey
		 * @param callback
		 * @param errorCallback
		 */
		this.convertInChIKeyToInChICode = function (inchiKey, callback, errorCallback) {

			$http.get(CTSURL + '/rest/convert/InChIKey/InChI Code/' + inchiKey).then(function (data) {
				if (angular.isDefined(data.data)) {
					data = data.data;

					if (angular.isArray(data)) {
						if (data.length > 0) {
							data = data[0];
							if (angular.isDefined(data.result)) {
								callback(data.result[0]);
							}
						}
					}
				}
			}).catch(function (error) {
				if (angular.isDefined(errorCallback)) {
					errorCallback(error);
				}
				else {
					if (error != null) {
						$log.warn('error: ' + error);
					}
					else {
						$log.warn("no error message provided!");
					}
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
					url: CTSURL + '/rest/molToInchi/',
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
								if (error != null) {
									$log.warn('error: ' + error);
								}
								else {
									$log.warn("no error message provided!");
								}
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
					else {
						//$log.debug('no data object is defined!');
					}
				}).catch(function (error) {
					if (angular.isDefined(errorCallback)) {
						errorCallback(error);
					}
					else {
						if (error != null) {
							$log.warn('error: ' + error);
						}
						else {
							$log.warn("no error message provided!");
						}
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
			$http.get(CTSURL + '/rest/inchikeytomol/' + inchiKey).then(function (data) {
				if (angular.isDefined(data.data)) {

					data = data.data;
					if (angular.isDefined(data.error)) {
						if (angular.isDefined(errorCallback)) {
							errorCallback(data.error);
						}
						else {
							if (error != null) {
								$log.warn('error: ' + error);
							}
							else {
								$log.warn("no error message provided!");
							}
						}
					}
					else if (angular.isDefined(data.molecule)) {
						if (data.molecule === "" || data.molecule === null) {
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
					if (error != null) {
						$log.warn('error: ' + error);
					}
					else {
						$log.warn("no error message provided!");
					}
				}
			});
		};

		/**
		 * utilizes chemspider to convert from a smiles to an inchi
		 * @param smiles
		 * @param callback
		 * @param errorCallback
		 */
		this.convertSmileToInChICode = function (smiles, callback, errorCallback) {
			$http({
					method: "post",
					url: CTSURL + '/rest/smilesToInchi/',
					transformRequest: transformRequestAsFormPost,
					data: {
						smiles: smiles.trim()
					}
				}
			).success(function (data) {

					if (angular.isDefined(data)) {

						if (angular.isDefined(data.error)) {
							if (angular.isDefined(errorCallback)) {
								errorCallback(data.error);
							}
							else {
								if (error != null) {
									$log.warn('error: ' + error);
								}
								else {
									$log.warn("no error message provided!");
								}
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
					else {
						//$log.debug('no data object is defined!');
					}
				}).catch(function (error) {
					if (angular.isDefined(errorCallback)) {
						errorCallback(error);
					}
					else {
						if (error != null) {
							$log.warn('error: ' + error);
						}
						else {
							$log.warn("no error message provided!");
						}
					}
				});
		};

		/**
		 * converts an inchi code to an inchi keyß
		 * @param inchiCode
		 * @param callback
		 * @param errorCallback
		 */
		this.convertInChICodeToKey = function (inchiCode, callback, errorCallback) {
			$http({
					method: "post",
					url: CTSURL + '/rest/inchicodetoinchikey/',
					transformRequest: transformRequestAsFormPost,
					data: {
						inchicode: inchiCode
					}
				}
			).success(function (data) {

					if (angular.isDefined(data)) {

						if (angular.isDefined(data.error)) {
							if (angular.isDefined(errorCallback)) {
								errorCallback(data.error);
							}
							else {
								if (error != null) {
									$log.warn('error: ' + error);
								}
								else {
									$log.warn("no error message provided!");
								}
							}
						}
						else if (angular.isDefined(data.inchikey)) {
							if (data.inchikey === "") {
								callback(null);
							}
							else {
								callback(data.inchikey);
							}
						}

					}
					else {
						$log.debug('no data object is defined!');
					}
				}).catch(function (error) {
					if (angular.isDefined(errorCallback)) {
						errorCallback(error);
					}
					else {
						if (error != null) {
							$log.warn('error: ' + error);
						}
						else {
							$log.warn("no error message provided!");
						}
					}
				});
		};

		/**
		 * provides us with the molfile for this key
		 * @param inchiCode
		 * @param callback
		 * @param errorCallback
		 */
		this.convertInChICodeToMol = function (inchiCode, callback, errorCallback) {
			$http({
					method: "post",
					url: CTSURL + '/rest/inchitomol/',
					transformRequest: transformRequestAsFormPost,
					data: {
						inchicode: inchiCode
					}
				}
			).success(function (data) {

					if (angular.isDefined(data)) {

						if (angular.isDefined(data.error)) {
							if (angular.isDefined(errorCallback)) {
								errorCallback(data.error);
							}
							else {
								if (error != null) {
									$log.warn('error: ' + error);
								}
								else {
									$log.warn("no error message provided!");
								}
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
					else {
						$log.debug('no data object is defined!');
					}
				}).catch(function (error) {
					if (angular.isDefined(errorCallback)) {
						errorCallback(error);
					}
					else {
						if (error != null) {
							$log.warn('error: ' + error);
						}
						else {
							$log.warn("no error message provided!");
						}
					}
				});
		};

		/**
		 * babel based fallback method
		 * @param inchiCode
		 * @param callback
		 * @param errorCallback
		 */
		this.convertInChICodeToMolUsingBabel = function (inchiCode, callback, errorCallback) {
			$http({
					method: "post",
					url: "http://cream.fiehnlab.ucdavis.edu:9292/cream.fiehnlab.ucdavis.edu:10000" + '/babel',
					transformRequest: transformRequestAsFormPost,
					data: {
						inchi: inchiCode
					}
				}
			).success(function (data) {

					if (angular.isDefined(data)) {

						if (angular.isDefined(data.error)) {
							if (angular.isDefined(errorCallback)) {
								errorCallback(data.error);
							}
							else {
								if (error != null) {
									$log.warn('error: ' + error);
								}
								else {
									$log.warn("no error message provided!");
								}
							}
						}
						else if (angular.isDefined(data.mol)) {
							if (data.mol === "") {
								callback(null);
							}
							else {
								callback(data.mol);
							}
						}

					}
					else {
						$log.debug('no data object is defined!');
					}
				}).catch(function (error) {

					if (angular.isDefined(errorCallback)) {
						errorCallback(error);
					}
					else {
						if (error != null) {
							$log.warn('error: ' + error);
						}
						else {
							$log.warn("no error message provided!");
						}
					}
				});
		};


	}
	gwCtsService.$inject = ['$http', 'CTSURL', '$log', 'transformRequestAsFormPost'];


	/**
	 * provides us with access to the chemify service
	 */
	function gwChemifyService($http, CTSURL, $log) {
		$http.defaults.useXDomain = true;

		/**
		 * converts the given name to an InChI Key
		 * @param chemicalName
		 * @param callback
		 */
		this.nameToInChIKey = function (chemicalName, callback, errorCallback) {

			$http.get(CTSURL + '/rest/chemify/identify/' + encodeURI(chemicalName)).then(function (data) {
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
					if (error != null) {
						$log.warn('error: ' + error);
					}
					else {
						$log.warn("no error message provided!");
					}
				}
			});
		}
	}
	gwChemifyService.$inject = ['$http', 'CTSURL', '$log'];
})();