/**
 * Created by Gert on 6/24/2014.
 */

'use strict';

angular.module('wohlgemuth.cts', []).
	config(function ($httpProvider) {
		//Enable cross domain calls
		$httpProvider.defaults.useXDomain = true;
	}).

/**
 * provides us with access to the general cts service
 */
	service('gwCtsService', function () {

		this.getNamesForInChIKey = function (inchiKey) {
		};

		this.convertToInchiKey = function (molecule) {

		};
		this.convertInchiKeyToMol = function (inchiKey) {
		}
	}).


/**
 * provides us with access to the chemify service
 */
	service('gwChemifyService', function ($http) {

		/**
		 * converts the given name to an InChI Key
		 * @param chemicalName
		 * @param callback
		 */
		this.nameToInChIKey = function (chemicalName, callback) {
			$http.get('http://cts.fiehnlab.ucdavis.edu/chemify/rest/identify/' + chemicalName).then(function (data) {
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
			});
		}
	});