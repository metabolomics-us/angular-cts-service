import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import * as i0 from "@angular/core";
export declare class CtsService {
    private http;
    private logger;
    private apiUrl;
    constructor(http: HttpClient, logger: NGXLogger, config?: CtsConstants);
    private serializeData;
    /**
     * converts the given Molecule to an InChI Key
     */
    convertToInchiKey: (molecule: any, callback: any, errorCallback: any) => void;
    /**
     * converts an InChI Key to a molecule
     */
    convertInchiKeyToMol: (inchiKey: any, callback: any, errorCallback: any) => void;
    /**
     * utilizes chemspider to convert from a smiles to an inchi
     */
    convertSmileToInChICode: (smiles: any, callback: any, errorCallback: any) => void;
    /**
     * converts an inchi code to an inchi keyß
     */
    convertInChICodeToKey: (inchiCode: any, callback: any, errorCallback: any) => void;
    /**
     * provides us with the molfile for this key
     */
    convertInChICodeToMol: (inchiCode: any, callback: any, errorCallback: any) => import("rxjs").Subscription;
    static ɵfac: i0.ɵɵFactoryDef<CtsService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<CtsService>;
}
//# sourceMappingURL=cts.service.d.ts.map