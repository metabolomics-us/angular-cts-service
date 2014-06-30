/**
 * Created by Gert on 6/16/2014.
 */
describe('wohlgemuth.cts test', function () {
	beforeEach(module('wohlgemuth.cts'));

	describe('when I call gwCtsService.getNamesForInChIKey', function () {
		it('should return an array of names for the given InChI Key', inject(function (gwCtsService, $httpBackend, CTSURL,$log) {


			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/service/convert/InChIKey/Chemical%20Name/QNAYBMKLOCPYGJ-REOHCLBHSA-N').respond(
				[
					{
						"fromIdentifier": "InChIKey",
						"searchTerm": "QNAYBMKLOCPYGJ-REOHCLBHSA-N",
						"toIdentifier": "Chemical Name",
						"result": [

							"(S)-()-Alanine",
							"2-Aminopropionic acid",
							"(S)-alanine",
							"(2S)-2-Aminopropanoate",
							"L-a-Aminopropionic acid",
							"ALANINE, L-",
							"Alanine"
						]
					}
				]
			);

			var result = [];

			gwCtsService.getNamesForInChIKey('QNAYBMKLOCPYGJ-REOHCLBHSA-N', function (data) {
				result = data;
			});
			$httpBackend.flush();

			expect(result).toEqual([
				"(S)-()-Alanine",
				"2-Aminopropionic acid",
				"(S)-alanine",
				"(2S)-2-Aminopropanoate",
				"L-a-Aminopropionic acid",
				"ALANINE, L-",
				"Alanine"
			]);

		}))
	});

	describe('when I call gwChemifyService.nameToInChIKey', function () {

		it('should return 1 hit for alanine, since the cts knows about it', inject(function (gwChemifyService, $httpBackend, CTSURL,$log) {

			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/chemify/rest/identify/alanine').respond(
				[
					{ "result": "QNAYBMKLOCPYGJ-REOHCLBHSA-N", "query": "alanine", "algorithm": "edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify", "score": 1.0, "scoring_algorithm": "edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount", "enhancements": [
						{ "unmodified search term": "alanine" },
						{ "time(ms) for identification": "1087" }
					] },
					{ "result": "QNAYBMKLOCPYGJ-UWTATZPHSA-N", "query": "alanine", "algorithm": "edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify", "score": 0.93, "scoring_algorithm": "edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount", "enhancements": [
						{ "unmodified search term": "alanine" },
						{ "time(ms) for identification": "1087" }
					] },
					{ "result": "QNAYBMKLOCPYGJ-UHFFFAOYSA-N", "query": "alanine", "algorithm": "edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify", "score": 0.79, "scoring_algorithm": "edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount", "enhancements": [
						{ "unmodified search term": "alanine" },
						{ "time(ms) for identification": "1087" }
					] }
				]
			);

			var result = "";
			gwChemifyService.nameToInChIKey('alanine', function (data) {
				result = data;
			});

			//flush it so that the request is actually executed
			$httpBackend.flush();
			expect(result).toEqual('QNAYBMKLOCPYGJ-REOHCLBHSA-N');

		}));

		it('should return nothing for alanineadasdas , since the cts DOES NOT know about it', inject(function (gwChemifyService, $httpBackend, CTSURL,$log) {

			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/chemify/rest/identify/alanineadasdas').respond(
				[
					{ "result": "nothing found", "query": "alanineadasdas", "algorithm": "edu.ucdavis.fiehnlab.chemify.identify.NothingIdentifiedAtAll", "score": 0.0, "scoring_algorithm": "edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount", "enhancements": [
						{ "time(ms) for identification": "2324" },
						{ "unmodified search term": "alanineadasdas" }
					] }
				]
			);

			var result = "";
			gwChemifyService.nameToInChIKey('alanineadasdas', function (data) {
				result = data;
			});

			//flush it so that the request is actually executed
			$httpBackend.flush();

			//we don't exspect any result since the service never returned
			expect(result).toEqual(null);

		}));

	});


	describe('when I call gwCtsService.convertInchiKeyToMol', function () {

		it('should return 1 hit for HQMLIDZJXVVKCW-REOHCLBHSA-O, since the cts knows about it', inject(function (gwCtsService, $httpBackend, CTSURL,$log) {

			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/service/inchikeytomol/HQMLIDZJXVVKCW-REOHCLBHSA-O').respond(
				{
					"molecule": "\n  CDK     0626141632\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5230    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0220    1.4114    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0680   -0.7511   -1.1772 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4087    1.6667   -0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1414    2.4413    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8717   -0.4996    0.9314 H   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0 \n  3  2  1  0  0  0  0 \n  4  2  1  0  0  0  0 \n  5  3  2  0  0  0  0 \n  6  3  1  0  0  0  0 \n  7  2  1  0  0  0  0 \nM  CHG  1   4   1\nM  END\n",
					"message": null
				}
			);

			var result = "";
			gwCtsService.convertInchiKeyToMol('HQMLIDZJXVVKCW-REOHCLBHSA-O', function (data) {
				result = data;
			});

			//flush it so that the request is actually executed
			$httpBackend.flush();
			expect(result).toEqual('\n  CDK     0626141632\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5230    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0220    1.4114    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0680   -0.7511   -1.1772 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4087    1.6667   -0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1414    2.4413    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8717   -0.4996    0.9314 H   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0 \n  3  2  1  0  0  0  0 \n  4  2  1  0  0  0  0 \n  5  3  2  0  0  0  0 \n  6  3  1  0  0  0  0 \n  7  2  1  0  0  0  0 \nM  CHG  1   4   1\nM  END\n');

		}));

		it('should return null for HQMLIDZJXVVKCW-REOHCDBHSA-O, since the cts knows about it', inject(function (gwCtsService, $httpBackend, CTSURL,$log) {

			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/service/inchikeytomol/HQMLIDZJXVVKCW-REOHCDBHSA-O').respond(
				{
					"molecule": "",
					"message": "Couldn't find a compound for that InChIKey."
				}
			);

			var result = "";
			gwCtsService.convertInchiKeyToMol('HQMLIDZJXVVKCW-REOHCDBHSA-O', function (data) {
				result = data;
			});

			//flush it so that the request is actually executed
			$httpBackend.flush();
			expect(result).toEqual(null);

		}));


		it('should call the error handler for ABC, since its an invalid inchi key', inject(function (gwCtsService, $httpBackend, CTSURL,$log) {

			//setup our exspected response
			$httpBackend.when('GET', CTSURL + '/service/inchikeytomol/ABC').respond(
				{
					"error": "Invalid InChIKey. I recieved a malformed InChIKey 'ABC'."
				}
			);

			var result = "";
			gwCtsService.convertInchiKeyToMol('ABC', function (data) {
			}, function (error) {
				result = error;
			});

			//flush it so that the request is actually executed
			$httpBackend.flush();
			expect(result).toEqual("Invalid InChIKey. I recieved a malformed InChIKey 'ABC'.");

		}));


	})


});