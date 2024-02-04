import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { DeleteDimentionRequest } from "../../infrastructure/models/dimention";
import { dimentionDeleteSchema } from "../../common/validations/dimentionValidation";
@injectable()
export class DeleteHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}

    async main (event:DeleteDimentionRequest){
        console.log("event---->",event);
        try {
            await dimentionDeleteSchema.validate(event);
            await this.dimentionService.deleteDimention(event.id_dimention);
            return {message:"delete complete"}
        } catch (error:any) {
            console.log("ERROR----->",error);
            return{
                code:"errorValidation",
                message: error.errors
            }
        }
    }
}

export const main = async (event:DeleteDimentionRequest) =>{
    const container = initContainer();
    const deleteHandler = container.get<DeleteHandler>(TYPES.DeleteHandler);
    return await deleteHandler.main(event);
}