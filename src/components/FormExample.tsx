import { TextField } from '@mui/material';
import { useMutation } from 'react-query';
import { z, ZodRawShape } from 'zod';

import { Form } from '@homework-task/components/common/Form';

// Define form data type
interface FormData {
    title: string;
    body: string;
}

interface FormDataZodObject extends ZodRawShape {
    title: z.ZodString;
    body: z.ZodString;
}

// Validation schema using Zod
const validationSchema: z.ZodObject<
    FormDataZodObject,
    'strip',
    z.ZodTypeAny,
    FormData,
    FormData
> = z.object({
    title: z
        .string()
        .max(50, { message: 'Title must be less than 50 characters' })
        .min(1, { message: 'Title is required' }),
    body: z
        .string()
        .max(200, { message: 'Body must be less than 200 characters' })
        .min(1, { message: 'Body is required' }),
});

export const FormExample = () => {
    const mutation = useMutation((postData: FormData) =>
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json())
    );

    return (
        <div>
            <h2>Create Post</h2>
            <Form<FormData, FormDataZodObject>
                useMutation={() => mutation}
                validationSchema={validationSchema}
                successMessage="Successfully created something"
                renderForm={({ register, errors }) => (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            autoFocus
                            {...register('title')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="body"
                            label="Body"
                            error={!!errors.body}
                            helperText={errors.body?.message}
                            {...register('body')}
                        />
                    </>
                )}
            />
        </div>
    );
};
