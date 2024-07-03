import { z, ZodRawShape } from 'zod';

export interface CustomFormData {
    title: string;
    body: string;
}

export interface CustomFormDataZodObject extends ZodRawShape {
    title: z.ZodString;
    body: z.ZodString;
}
