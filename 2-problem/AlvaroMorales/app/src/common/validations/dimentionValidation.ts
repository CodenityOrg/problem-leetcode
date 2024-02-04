import { object, string } from 'yup';

export const dimentionCreateSchema = object().shape({
    name: string().required("name is required").nonNullable(),
    description: string().required("description is required").nonNullable(),
    nivelDanger: string().required("nivelDanger is required").nonNullable(),
});

export const dimentionDeleteSchema = object().shape({
    id_dimention: string().required("id_dimention is required").uuid(),
});

export const dimentionGetSchema = object().shape({
    id_dimention: string().required("id_dimention is required").uuid(),
});

export const dimentionUpdateSchema = object().shape({
    source: string().required("source is required").uuid(),
    name: string().required("name is required").nonNullable(),
    description: string().required("description is required").nonNullable(),
    nivelDanger: string().required("nivelDanger is required").nonNullable(),
    // data: object().notRequired(),
});