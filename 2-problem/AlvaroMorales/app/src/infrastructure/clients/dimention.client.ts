import { injectable } from "inversify";
import { DimentionRepository } from "../../domain/repositories/dimention.repository";
import { Dimention } from "../models/dimention";
@injectable()
export class DynDimentionClient implements DimentionRepository{
    constructor(){}
    async createDimention(dimention: Dimention): Promise<void> {
        console.log("Hola CREATEDIMENTION");
    }
    async getDimention(source: string): Promise<Dimention> {
        throw new Error("Method not implemented.");
    }
    async updateDimention(dimention: Dimention): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteDimention(source: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}