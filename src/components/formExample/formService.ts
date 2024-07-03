import axios, { AxiosResponse } from 'axios';

import { API_ROUTES } from '@homework-task/api/apiRoutes';
import { CustomFormData } from '@homework-task/components/formExample/types';

export const postFormData = async (
    formData: CustomFormData
): Promise<FormData> => {
    const response = await axios.post<FormData, AxiosResponse<FormData>>(
        API_ROUTES.POST_FORM_DATA,
        formData,
        {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    );
    return response.data;
};
