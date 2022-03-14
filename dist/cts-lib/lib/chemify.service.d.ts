import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import * as i0 from "@angular/core";
export declare class ChemifyService {
    http: HttpClient;
    logger: NGXLogger;
    ctsConstants: CtsConstants;
    private apiUrl;
    constructor(http: HttpClient, logger: NGXLogger, ctsConstants: CtsConstants);
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey: (chemicalName: any, callback: any, errorCallback: any) => void;
    static ɵfac: i0.ɵɵFactoryDef<ChemifyService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ChemifyService>;
}
//# sourceMappingURL=chemify.service.d.ts.map