import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { UpdateDimentionRequest } from "../../infrastructure/models/dimention";
import { DimentionService } from "../../domain/Services/create-dimention.service";

@injectable()
export class UpdateHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService: DimentionService
    ){}
    async main (event:UpdateDimentionRequest){
        console.log("UPDATEEVENET----->",event);
        return await this.dimentionService.updateDimention(event);
    }
}

export const main = async(event:UpdateDimentionRequest) => {
    const container =initContainer();
    const updateHandler = container.get<UpdateHandler>(TYPES.UpdateHandler);
    return await updateHandler.main(event);
}