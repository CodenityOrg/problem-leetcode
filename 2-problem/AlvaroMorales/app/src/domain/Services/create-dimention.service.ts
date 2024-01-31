import { inject, injectable } from "inversify";
import { TYPES } from "../../common/types";
import { DimentionRepository } from "../repositories/dimention.repository";
import { Dimention } from "../../infrastructure/models/dimention";

@injectable()
export class DimentionService{
    constructor(
        @inject(TYPES.DynDimentionClient) private readonly dimentionRepository:DimentionRepository,
    ){}
    async createDimention(dimention:Dimention){
        await this.dimentionRepository.createDimention(dimention);
    }
}