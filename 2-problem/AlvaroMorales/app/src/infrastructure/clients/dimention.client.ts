import { inject, injectable } from "inversify";
import { DimentionRepository } from "../../domain/repositories/dimention.repository";
import { Dimention } from "../models/dimention";
import { TYPES } from "../../common/types";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
@injectable()
export class DynDimentionClient implements DimentionRepository{
    constructor(
        @inject(TYPES.DynamoDBDocumentClient) private readonly dynamoDBDocumentClient: DynamoDBDocumentClient,
        @inject(TYPES.DynTableDimetions) public dynTableDimentions:string
    ){}
    async createDimention(dimention: Dimention): Promise<Dimention> {
        try {
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
    }
    async getDimention(source: string): Promise<Dimention> {
        try {
            const Dimention:any = await this.dynamoDBDocumentClient.send(
                new QueryCommand({
                    TableName: this.dynTableDimentions,
                    KeyConditionExpression: "#source = :source",
                    ExpressionAttributeNames: {
                    "#source": "source",
                    },
                    ExpressionAttributeValues: {
                    ":source": source,
                    },
                })
            )
            return Dimention.Items[0]
        } catch (error) {
            console.log("ERROR------>",error);
            throw new Error("error GetDimention");
        }
    }
    async updateDimention(dimention: Dimention): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteDimention(source: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}