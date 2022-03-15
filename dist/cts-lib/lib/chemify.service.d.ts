import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstant } from './cts-constant';
import * as i0 from "@angular/core";
export declare class ChemifyService {
    http: HttpClient;
    logger: NGXLogger;
    config: CtsConstant;
    apiUrl: any;
    constructor(http: HttpClient, logger: NGXLogger, config: CtsConstant);
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey(chemicalName: any, callback: any, errorCallback: any): void;
    static ɵfac: i0.ɵɵFactoryDef<ChemifyService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ChemifyService>;
}
//# sourceMappingURL=chemify.service.d.ts.map