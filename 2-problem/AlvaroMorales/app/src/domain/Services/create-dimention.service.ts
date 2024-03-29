import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { TYPES } from "../../common/types";
import { DimentionRepository } from "../repositories/dimention.repository";
import { Dimention, DimentionRequest, GetDimentionRequest, UpdateDimentionRequest } from "../../infrastructure/models/dimention";

@injectable()
export class DimentionService{
    constructor(
        @inject(TYPES.DynDimentionClient) private readonly dimentionRepository:DimentionRepository,
    ){}
    async createDimention(dimention:DimentionRequest){
        const buildDimentionSave = this.buildDimention(dimention); 
        return await this.dimentionRepository.createDimention(buildDimentionSave);
    }
    async getDimention(source:string){
        return await this.dimentionRepository.getDimention(source);
    }
    async deleteDimention (source:string){
        return await this.dimentionRepository.deleteDimention(source);
    }
    async updateDimention (event:UpdateDimentionRequest){
        return await this.dimentionRepository.updateDimention(event);
    }
    async getAllDimention(){
        return await this.dimentionRepository.getAllDimention();
    }

    private buildDimention(event:DimentionRequest):Dimention{
        const newDimention:Dimention = {
            source: `${uuidv4()}`,
            name: event.name,
            description: event.description,
            nivelDanger: event.nivelDanger
        }
        return newDimention;
    }
}