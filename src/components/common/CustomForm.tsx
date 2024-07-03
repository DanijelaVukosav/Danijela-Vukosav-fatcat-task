import { ReactNode, useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    useForm,
    SubmitHandler,
    FieldErrors,
    FieldValues,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { ZodObject, ZodRawShape, ZodTypeAny } from 'zod';

import { ErrorOverlayMessage } from '@homework-task/components/common/ErrorOverlayMessage';
import { SuccessOverlayMessage } from '@homework-task/components/common/SuccessOverlayMessage';

interface SuccessData {
    message: string;
    resetFormOnSuccess?: boolean;
}

interface SubmitButtonData {
    label?: string;
    loadingLabel?: string;
    className?: string;
}

interface FormGeneratorProps<T extends FieldValues, K extends ZodRawShape> {
    useMutation: () => UseMutationResult<unknown, unknown, T>;
    validationSchema: ZodObject<K, 'strip', ZodTypeAny, T, T>;
    successData: SuccessData;
    submitButtonData?: SubmitButtonData;
    renderForm: (props: {
        register: ReturnType<typeof useForm<T>>['register'];
        errors: FieldErrors<T>;
    }) => ReactNode;
}

export const CustomForm = <T extends FieldValues, K extends ZodRawShape>({
    useMutation,
    validationSchema,
    successData,
    submitButtonData,
    renderForm,
}: FormGeneratorProps<T, K>) => {
    const [formErrorMessage, setFormErrorMessage] = useState<string>();
    const [formSuccessMessage, setFormSuccessMessage] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<T>({
        resolver: zodResolver(validationSchema),
    });
    const mutation = useMutation();
    const { mutate, isLoading } = mutation;

    const handleFormSubmit: SubmitHandler<T> = useCallback(
        (formData): void => {
            mutate(formData, {
                onSuccess: () => {
                    setFormSuccessMessage(successData.message);
                    if (successData.resetFormOnSuccess) {
                        reset();
                    }
                },
                onError: (err: unknown) => {
                    let errorMessage = 'Something went wrong';
                    if (err instanceof Error) {
                        errorMessage = err.message;
                    } else if (typeof err === 'string') {
                        errorMessage = err;
                    }
                    // toast(`Error: ${errorMessage}`);
                    setFormErrorMessage(errorMessage);
                },
            });
        },
        [mutate, reset, successData]
    );

    return (
        <form onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
            {renderForm({ register, errors })}
            <button
                type="submit"
                disabled={isLoading}
                className={
                    submitButtonData?.className ??
                    'w-full rounded-lg text-white p-[15px] bg-[#91E372]'
                }
            >
                {isLoading
                    ? submitButtonData?.loadingLabel ?? 'Loading...'
                    : submitButtonData?.label ?? 'Submit'}
            </button>
            {formErrorMessage && (
                <ErrorOverlayMessage
                    message={formErrorMessage}
                    onClose={() => setFormErrorMessage(undefined)}
                />
            )}
            {formSuccessMessage && (
                <SuccessOverlayMessage
                    message={formSuccessMessage}
                    onClose={() => setFormSuccessMessage(undefined)}
                />
            )}
        </form>
    );
};
