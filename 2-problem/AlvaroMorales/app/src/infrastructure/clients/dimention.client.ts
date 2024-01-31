import { inject, injectable } from "inversify";
import { DimentionRepository } from "../../domain/repositories/dimention.repository";
import { Dimention } from "../models/dimention";
import { TYPES } from "../../common/types";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
@injectable()
export class DynDimentionClient implements DimentionRepository{
    constructor(
        @inject(TYPES.DynamoDBDocumentClient) private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
        @inject(TYPES.DynTableDimetions) public dynTableDimentions:string
    ){}
    async createDimention(dimention: Dimention): Promise<Dimention> {
        console.log("dimention->",dimention);
        try {
            const marshalledDimention = marshall(dimention);
            console.log("marshalledDimention->",marshalledDimention);
            console.log("this.dynTableDimentions->",this.dynTableDimentions);
            await this.dynamoDBDocumentClient.send(
                new PutCommand({
                    TableName: this.dynTableDimentions,
                    Item: dimention
                })
            )
            return dimention;
        } catch (error) {
            console.log("ERROR--->",error);
            throw new Error("error CreateDimention");
        }
        console.log("Hola CREATEDIMENTION",JSON.stringify(dimention));
    }
    async getDimention(source: string): Promise<Dimention> {
        throw new Error("Method not implemented.");
    }
    async updateDimention(dimention: Dimention): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteDimention(source: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}