import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { UpdateDimentionRequest } from "../../infrastructure/models/dimention";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { dimentionUpdateSchema } from "../../common/validations/dimentionValidation";

@injectable()
export class UpdateHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService: DimentionService
    ){}
    async main (event:UpdateDimentionRequest){
        try {
            await dimentionUpdateSchema.validate(event);
            console.log("UPDATEEVENET----->",event);
            await this.dimentionService.updateDimention(event);
            return {message:"Update complete"}
        } catch (error:any) {
            console.log("ERROR----->",error);
            return{
                code:"errorValidation",
                message: error.errors
            }
        }
    }
}

export const main = async(event:UpdateDimentionRequest) => {
    const container =initContainer();
    const updateHandler = container.get<UpdateHandler>(TYPES.UpdateHandler);
    return await updateHandler.main(event);
}