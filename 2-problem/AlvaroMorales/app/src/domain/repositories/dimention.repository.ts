import { Dimention, UpdateDimentionRequest } from "../../infrastructure/models/dimention";

export interface DimentionRepository {
    createDimention(dimention:Dimention):Promise<Dimention>;
    getDimention(source:string):Promise<Dimention>;
    updateDimention(dimention:UpdateDimentionRequest):Promise<void>;
    deleteDimention(source:string):Promise<void>;
}