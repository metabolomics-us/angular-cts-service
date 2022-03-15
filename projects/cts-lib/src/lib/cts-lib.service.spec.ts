import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CtsService } from './cts.service';
import {ChemifyService} from './chemify.service';
import {LoggerTestingModule, NGXLoggerMock} from 'ngx-logger/testing';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';

describe('CtsLibService', () => {
  let service: CtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [CtsService]
    });
    service = TestBed.inject(CtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('when I call gwCtsService.convertInchiKeyToMol', () => {

  let service: CtsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let logger: NGXLogger;
  const apiUrl = 'http://cts.fiehnlab.ucdavis.edu';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        CtsService]
    });
    service = TestBed.inject(CtsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    logger = TestBed.inject(NGXLogger);
  });
  it('should return 1 hit for HQMLIDZJXVVKCW-REOHCLBHSA-O, since the cts knows about it', () => {
    const sampleResult = {
          molecule: '\n  CDK     0626141632\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5230    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0220    1.4114    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0680   -0.7511   -1.1772 N   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4087    1.6667   -0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1414    2.4413    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8717   -0.4996    0.9314 H   0  0  0  0  0  0  0  0  0  0  0  0\n  2  1  1  0  0  0  0 \n  3  2  1  0  0  0  0 \n  4  2  1  0  0  0  0 \n  5  3  2  0  0  0  0 \n  6  3  1  0  0  0  0 \n  7  2  1  0  0  0  0 \nM  CHG  1   4   1\nM  END\n',
          message: null
    };

    service.convertInchiKeyToMol('HQMLIDZJXVVKCW-REOHCLBHSA-O', (data) => {
      expect(data).toEqual(sampleResult.molecule);
    }, undefined);

    const req = httpTestingController.expectOne(`${apiUrl}/service/inchikeytomol/HQMLIDZJXVVKCW-REOHCLBHSA-O`);
    expect(req.request.method).toBe('GET');
    req.flush(sampleResult);
  });

  it('should return null for HQMLIDZJXVVKCW-REOHCDBHSA-O, since the cts knows about it', () => {
    const results = {
      molecule: '',
      message: 'Couldn\'t find a compound for that InChIKey.'
    };

    service.convertInchiKeyToMol('HQMLIDZJXVVKCW-REOHCDBHSA-O', (data) => {
      expect(data).toEqual(null);
    }, undefined);
    const req = httpTestingController.expectOne(`${apiUrl}/service/inchikeytomol/HQMLIDZJXVVKCW-REOHCDBHSA-O`);
    expect(req.request.method).toBe('GET');
    req.flush(results);

  });


  it('should call the error handler for ABC, since its an invalid inchi key', () => {
    const results = {
      error: 'Invalid InChIKey. I recieved a malformed InChIKey \'ABC\'.'
    };
    service.convertInchiKeyToMol('ABC', (data) => {}, (error) => {
      expect(error).toEqual(results.error);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/service/inchikeytomol/ABC`);
    expect(req.request.method).toBe('GET');
    req.flush(results);
  });
});

describe('when I call gwChemifyService.nameToInChIKey', () => {
  let service: ChemifyService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let logger: NGXLogger;
  const apiUrl = 'http://cts.fiehnlab.ucdavis.edu';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        ChemifyService]
    });
    service = TestBed.inject(ChemifyService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    logger = TestBed.inject(NGXLogger);
  });

  it('should return 1 hit for alanine, since the cts knows about it', () => {

    const results = [
      {
        result: 'QNAYBMKLOCPYGJ-REOHCLBHSA-N',
        query: 'alanine',
        algorithm: 'edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify',
        score: 1.0,
        scoring_algorithm: 'edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount',
        enhancements: [
          {'unmodified search term': 'alanine'},
          {'time(ms) for identification': '1087'}
        ]
      },
      {
        result: 'QNAYBMKLOCPYGJ-UWTATZPHSA-N',
        query: 'alanine',
        algorithm: 'edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify',
        score: 0.93,
        scoring_algorithm: 'edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount',
        enhancements: [
          {'unmodified search term': 'alanine'},
          {'time(ms) for identification': '1087'}
        ]
      },
      {
        result: 'QNAYBMKLOCPYGJ-UHFFFAOYSA-N',
        query: 'alanine',
        algorithm: 'edu.ucdavis.fiehnlab.chemify.identify.pubchem.PCNameIdentify',
        score: 0.79,
        scoring_algorithm: 'edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount',
        enhancements: [
          {'unmodified search term': 'alanine'},
          {'time(ms) for identification': '1087'}
        ]
      }
    ];

    service.nameToInChIKey('alanine', (data) => {
      expect(data).toEqual('QNAYBMKLOCPYGJ-REOHCLBHSA-N');
    }, undefined);

    const req = httpTestingController.expectOne(`${apiUrl}/chemify/rest/identify/alanine`);
    expect(req.request.method).toBe('GET');
    req.flush(results);
  });

  it('should return nothing for alanineadasdas , since the cts DOES NOT know about it', () => {
    const results = [
      { result: 'nothing found', query: 'alanineadasdas', algorithm: 'edu.ucdavis.fiehnlab.chemify.identify.NothingIdentifiedAtAll',
        score: 0.0,
        scoring_algorithm: 'edu.ucdavis.fiehnlab.chemify.scoring.cts.ScoreByBiologicalCount',
        enhancements: [
          { 'time(ms) for identification': '2324' },
          { 'unmodified search term': 'alanineadasdas' }
        ] }
    ];

    service.nameToInChIKey('alanineadasdas', (data) => {
      expect(data).toEqual(null);
    }, undefined);

    const req = httpTestingController.expectOne(`${apiUrl}/chemify/rest/identify/alanineadasdas`);
    expect(req.request.method).toBe('GET');
    req.flush(results);


   });
});
