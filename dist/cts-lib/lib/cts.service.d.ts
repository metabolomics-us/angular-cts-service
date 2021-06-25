import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import * as i0 from "@angular/core";
export declare class CtsService {
    private http;
    private logger;
    constructor(http: HttpClient, logger: NGXLogger);
    private serializeData;
    /**
     * converts the given Molecule to an InChI Key
     * @param molecule
     * @param callback
     * @param errorCallback
     */
    convertToInchiKey: (molecule: any) => import("rxjs").Observable<Object>;
    /**
     * converts an InChI Key to a molecule
     * @param inchiKey
     * @param callback
     * @param errorCallback
     */
    convertInchiKeyToMol: (inchiKey: any) => import("rxjs").Observable<Object>;
    /**
     * utilizes chemspider to convert from a smiles to an inchi
     * @param smiles
     * @param callback
     * @param errorCallback
     */
    convertSmileToInChICode: (smiles: any) => import("rxjs").Observable<Object>;
    /**
     * converts an inchi code to an inchi keyß
     * @param inchiCode
     * @param callback
     * @param errorCallback
     */
    convertInChICodeToKey: (inchiCode: any) => import("rxjs").Observable<Object>;
    /**
     * provides us with the molfile for this key
     * @param inchiCode
     * @param callback
     * @param errorCallback
     */
    convertInChICodeToMol: (inchiCode: any) => import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDef<CtsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<CtsService>;
}
//# sourceMappingURL=cts.service.d.ts.map