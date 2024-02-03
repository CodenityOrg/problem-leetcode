import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { GetDimentionRequest } from "../../infrastructure/models/dimention";

@injectable()
export class GetHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}
    async main(event:GetDimentionRequest) {
        console.log("event---->",event);
       try {
            return await this.dimentionService.getDimention(event.id_dimention);
            //console.log("dimentionGet-->",dimentionSave);
            //return dimentionSave
       } catch (error) {
        console.log("ERROR----->",error);
       }
    }
}

export const main = async(event:GetDimentionRequest)=>{
    const container = initContainer();
    const getHandler = container.get<GetHandler>(TYPES.GetHandler);
    return await getHandler.main(event);
}
