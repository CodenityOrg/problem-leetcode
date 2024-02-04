import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { GetDimentionRequest } from "../../infrastructure/models/dimention";
import { dimentionGetSchema } from "../../common/validations/dimentionValidation";

@injectable()
export class GetAllHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}
    async main() {
        // console.log("event---->",event);
       try {
            return await this.dimentionService.getAllDimention();
       } catch (error:any) {
            console.log("ERROR----->",error);
            return{
                code:"errorValidation",
                message: error.errors
            }
       }
    }
}

export const main = async()=>{
    const container = initContainer();
    const getAllHandler = container.get<GetAllHandler>(TYPES.GetAllHandler);
    return await getAllHandler.main();
}
