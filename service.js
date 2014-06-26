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
	service('gwCtsService', function ($http) {

		/**
		 * returns all known names for the given InChIKey
		 * @param inchiKey
		 * @param callback
		 */
		this.getNamesForInChIKey = function (inchiKey, callback) {
			$http.get('http://cts.fiehnlab.ucdavis.edu/service/convert/InChIKey/Chemical%20Name/' + inchiKey).then(function (data) {
				if (angular.isDefined(data.data)) {
					data = data.data;

					if (angular.isArray(data)) {
						if (data.length > 0) {
							data = data[0];
							if (angular.isDefined(data.result)) {
								callback(data.result);
							}
						}
					}
				}
			})
		};

		/**
		 * converts the given Molecule to an InChI Key
		 * @param molecule
		 * @param callback
		 */
		this.convertToInchiKey = function (molecule, callback) {

		};

		/**
		 * converts an InChI Key to a molecule
		 * @param inchiKey
		 * @param callback
		 */
		this.convertInchiKeyToMol = function (inchiKey, callback) {
			$http.get('http://cts.fiehnlab.ucdavis.edu/service/convert/InChIKey/Chemical%20Name/' + inchiKey).then(function (data) {
				if (angular.isDefined(data.data)) {
					data = data.data;

					if (angular.isArray(data)) {
						if (data.length > 0) {
							data = data[0];
							if (angular.isDefined(data.result)) {
								callback(data.result);
							}
						}
					}
				}
			})
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