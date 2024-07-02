import { zodResolver } from '@hookform/resolvers/zod';
import {
    useForm,
    SubmitHandler,
    FieldErrors,
    FieldValues,
} from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { ZodObject, ZodRawShape, ZodTypeAny } from 'zod';

interface FormGeneratorProps<T extends FieldValues, K extends ZodRawShape> {
    useMutation: () => UseMutationResult<T, unknown, T>;
    validationSchema: ZodObject<K, 'strip', ZodTypeAny, T, T>;
    successMessage: string;
    renderForm: (props: {
        register: ReturnType<typeof useForm<T>>['register'];
        errors: FieldErrors<T>;
    }) => React.ReactNode;
}

export const Form = <T extends FieldValues, K extends ZodRawShape>({
    useMutation,
    validationSchema,
    successMessage,
    renderForm,
}: FormGeneratorProps<T, K>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<T>({
        resolver: zodResolver(validationSchema),
    });
    const mutation = useMutation();
    const { mutate, isLoading, isError, isSuccess } = mutation;

    const handleFormSubmit: SubmitHandler<T> = async (
        formData
    ): Promise<void> => {
        try {
            await mutate(formData);
            alert(successMessage);
            reset();
        } catch (error) {
            alert(`Submission Error: ${error?.toString()}`);
        }
    };

    return (
        <form onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
            {renderForm({ register, errors })}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            {isError && <div>Submission Error!</div>}
            {isSuccess && <div>{successMessage}</div>}
        </form>
    );
};
