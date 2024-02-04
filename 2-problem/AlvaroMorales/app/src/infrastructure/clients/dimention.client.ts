import { inject, injectable } from "inversify";
import { DimentionRepository } from "../../domain/repositories/dimention.repository";
import { Dimention, UpdateDimentionRequest } from "../models/dimention";
import { TYPES } from "../../common/types";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
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
    async updateDimention(dimention: UpdateDimentionRequest): Promise<void> {
        try {
            const updaeDimention = await this.dynamoDBDocumentClient.send(
                new PutCommand({
                    TableName: this.dynTableDimentions,
                    Item: dimention
                })
            )
            console.log("updaeDimention---->",updaeDimention);
        } catch (error) {
            console.log("ERROR----->",error);
            throw new Error("error UpdateDimention");
        }
    }
    async deleteDimention(source: string): Promise<void> {
        try {
            const deleteDimention = await this.dynamoDBDocumentClient.send(
                new DeleteCommand({
                    TableName: this.dynTableDimentions,
                    Key: {
                        source: source,
                      }
                })
            )
            console.log("deleteDimention------>",deleteDimention);
        } catch (error) {
            console.log("ERROR----->",error);
            throw new Error("error DeleteDimention");
        }
    }
    async getAllDimention(): Promise<Dimention[]>{
        const Dimention:any = await this.dynamoDBDocumentClient.send(
            new ScanCommand({
                TableName: this.dynTableDimentions,
                Limit: 20
            })
        )
        return Dimention.Items
    }

}