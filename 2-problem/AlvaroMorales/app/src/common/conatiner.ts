import "reflect-metadata";
import 'dotenv/config'
import { Container } from "inversify";
import { TYPES } from "./types";
import { DimentionService } from "../domain/Services/create-dimention.service";
import { DimentionRepository } from "../domain/repositories/dimention.repository";
import { DynDimentionClient } from "../infrastructure/clients/dimention.client";
import { CreateHandler } from "../functions/create-dimention/handler";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetHandler } from "../functions/get-dimention/handler";
import { DeleteHandler } from "../functions/delete-dimention/handler";
import { UpdateHandler } from "../functions/update-dimention/handler";
import { GetAllHandler } from "../functions/all-dimention/handler";

const initContainer = () => {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const container = new Container();

    container.bind<DynamoDBDocumentClient>(TYPES.DynamoDBDocumentClient).toConstantValue(docClient);
    container.bind<string>(TYPES.DynTableDimetions).toConstantValue(process.env.DYN_CODENITY_DIMENTION as string);
    container.bind<CreateHandler>(TYPES.CreateHandler).to(CreateHandler);
    container.bind<GetHandler>(TYPES.GetHandler).to(GetHandler);
    container.bind<DeleteHandler>(TYPES.DeleteHandler).to(DeleteHandler);
    container.bind<UpdateHandler>(TYPES.UpdateHandler).to(UpdateHandler);
    container.bind<GetAllHandler>(TYPES.GetAllHandler).to(GetAllHandler);

    container.bind<DimentionService>(TYPES.DimentionService).to(DimentionService);
    container.bind<DimentionRepository>(TYPES.DynDimentionClient).to(DynDimentionClient)
    return container;
}

export { initContainer }