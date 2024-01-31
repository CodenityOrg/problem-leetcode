import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";
import { DimentionRequest } from "src/infrastructure/models/dimention";

@injectable()
export class CreateHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}
    async main(event:DimentionRequest) {
        await this.dimentionService.createDimention(event);
    }
}

export const main = async(event:DimentionRequest)=>{
    const container = initContainer();

    const createHandler = container.get<CreateHandler>(TYPES.CreateHandler);
    await createHandler.main(event);
}

const dimention ={
    name:"dimention-x",
    description:"esto es una descripcion dimention 3",
    nivelDanger:"facil",
}
main(dimention).catch(err => console.error(err));
