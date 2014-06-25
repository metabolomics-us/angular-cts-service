/**
 * Created by Gert on 6/16/2014.
 */
describe('wohlgemuth.cts test', function () {
	beforeEach(module('wohlgemuth.cts'));

	describe('when I call gwCtsService.getNamesForInChIKey', function () {
		it('should return an array of names for the given InChI Key', inject(function (gwCtsService, $httpBackend) {


			//setup our exspected response
			$httpBackend.when('GET', 'http://cts.fiehnlab.ucdavis.edu/service/convert/InChIKey/Chemical%20Name/QNAYBMKLOCPYGJ-REOHCLBHSA-N').respond(
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

		it('should return 1 hit for alanine, since the cts knows about it', inject(function (gwChemifyService, $httpBackend) {

			//setup our exspected response
			$httpBackend.when('GET', 'http://cts.fiehnlab.ucdavis.edu/chemify/rest/identify/alanine').respond(
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

		it('should return nothing for alanineadasdas , since the cts DOES NOT know about it', inject(function (gwChemifyService, $httpBackend) {

			//setup our exspected response
			$httpBackend.when('GET', 'http://cts.fiehnlab.ucdavis.edu/chemify/rest/identify/alanineadasdas').respond(
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

	})

});