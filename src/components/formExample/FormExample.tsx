import { TextField } from '@mui/material';
import clsx from 'clsx';
import { useMutation } from 'react-query';
import { z } from 'zod';

import { CustomForm } from '@homework-task/components/common/CustomForm';
import { postFormData } from '@homework-task/components/formExample/formService';
import {
    CustomFormDataZodObject,
    CustomFormData,
} from '@homework-task/components/formExample/types';

const validationSchema: z.ZodObject<
    CustomFormDataZodObject,
    'strip',
    z.ZodTypeAny,
    CustomFormData,
    CustomFormData
> = z.object({
    title: z
        .string()
        .min(1, { message: 'Title is required' })
        .max(50, { message: 'Title must be less than 50 characters' }),
    body: z
        .string()
        .min(1, { message: 'Body is required' })
        .max(200, { message: 'Body must be less than 300 characters' }),
});

export const FormExample = () => {
    const mutation = useMutation((postData: CustomFormData) =>
        postFormData(postData)
    );

    return (
        <div
            className={clsx(
                'flex',
                'justify-center',
                'items-center',
                'w-screen',
                'p-[5%]'
            )}
        >
            <div className={'w-2/5'}>
                <h2 className={clsx('text-center', 'text-2xl', 'p-[20px]')}>
                    Scalable and Reusable form example
                </h2>
                <CustomForm<CustomFormData, CustomFormDataZodObject>
                    useMutation={() => mutation}
                    validationSchema={validationSchema}
                    successData={{ message: 'Great, success post data!' }}
                    submitButtonData={{
                        className:
                            'w-full rounded-lg text-[#475447] p-[15px] bg-[#ffee8d]',
                    }}
                    renderForm={({ register, errors }) => (
                        <>
                            <TextField
                                margin="normal"
                                // required
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
                                // required
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
        </div>
    );
};
