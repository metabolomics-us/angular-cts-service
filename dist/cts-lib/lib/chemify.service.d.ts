import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import * as i0 from "@angular/core";
export declare class ChemifyService {
    private http;
    private logger;
    constructor(http: HttpClient, logger: NGXLogger);
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey: (chemicalName: any, callback: any, errorCallback: any) => void;
    static ɵfac: i0.ɵɵFactoryDef<ChemifyService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ChemifyService>;
}
//# sourceMappingURL=chemify.service.d.ts.map