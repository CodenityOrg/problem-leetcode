import { Dimention } from "../../infrastructure/models/dimention";

export interface DimentionRepository {
    createDimention(dimention:Dimention):Promise<Dimention>;
    getDimention(source:string):Promise<Dimention>;
    updateDimention(dimention:Dimention):Promise<void>;
    deleteDimention(source:string):Promise<void>;
}