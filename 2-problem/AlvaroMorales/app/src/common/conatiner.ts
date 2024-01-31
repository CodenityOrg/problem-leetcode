import "reflect-metadata";
import 'dotenv/config'
import { Container } from "inversify";
import { TYPES } from "./types";
import { DimentionService } from "../domain/Services/create-dimention.service";
import { DimentionRepository } from "../domain/repositories/dimention.repository";
import { DynDimentionClient } from "../infrastructure/clients/dimention.client";
import { CreateHandler } from "../functions/create-dimention/handler";

const initContainer = () => {
    const container = new Container();

    container.bind<string>(TYPES.DynTableDimetions).toConstantValue(process.env.DYN_CODENITY_DIMENTION as string);
    container.bind<CreateHandler>(TYPES.CreateHandler).to(CreateHandler);
    container.bind<DimentionService>(TYPES.DimentionService).to(DimentionService);
    container.bind<DimentionRepository>(TYPES.DynDimentionClient).to(DynDimentionClient)
    return container;
}

export { initContainer }