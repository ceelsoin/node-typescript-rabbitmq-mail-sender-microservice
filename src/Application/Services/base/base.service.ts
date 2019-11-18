import { DomainBase } from "../../../Domain/base/base.domain";
import { SelectorBase } from "../../Seletors/base/seletor.base";

export abstract class BaseService<D extends DomainBase, S extends SelectorBase> {

    /**
     * 
     */
    constructor() {

    }

    abstract createEntity(input: any): D;
}