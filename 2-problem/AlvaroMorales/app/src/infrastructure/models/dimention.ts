export type Dimention = {
    source:string,
    name:string,
    description:string,
    nivelDanger:string
    data?:{}
}
export type DimentionRequest = {
    name:string,
    description:string,
    nivelDanger:string
}
export type GetDimentionRequest = {
    id_dimention:string
}
export type DeleteDimentionRequest = {
    id_dimention:string
}
export type UpdateDimentionRequest = {
    name:string,
    description:string,
    nivelDanger:string,
    data?:{},
    source?:string

}