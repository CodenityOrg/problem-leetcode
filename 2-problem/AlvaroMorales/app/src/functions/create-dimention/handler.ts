import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { DimentionService } from "../../domain/Services/create-dimention.service";

@injectable()
export class CreateHandler{
    constructor(
        @inject(TYPES.DimentionService) private readonly dimentionService:DimentionService,
    ){}
    async main() {
        const dimention ={
            source:"string",
            name:"string",
            description:"string",
            nivelDanger:"string",
            data:{}
        }
        await this.dimentionService.createDimention(dimention);
    }
}

export const main = async()=>{
    const container = initContainer();

    const createHandler = container.get<CreateHandler>(TYPES.CreateHandler);
    await createHandler.main();
}

main().catch(err => console.error(err));