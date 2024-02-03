import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { Dimention, DimentionRequest } from "../../infrastructure/models/dimention";

@injectable()
export class CreateHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}
    async main(event:DimentionRequest) {
        console.log("event---->",event);
       try {
            const dimentionSave = await this.dimentionService.createDimention(event);
            console.log("dimentionSave-->",dimentionSave);
            return dimentionSave
       } catch (error) {
        console.log("ERROR----->",error);
       }
    }
}

export const main = async(event:DimentionRequest)=>{
    const container = initContainer();
    const createHandler = container.get<CreateHandler>(TYPES.CreateHandler);
    return await createHandler.main(event);
}
