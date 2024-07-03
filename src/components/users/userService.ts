import axios, { AxiosResponse } from 'axios';

import { API_ROUTES } from '@homework-task/api/apiRoutes';
import { User } from '@homework-task/components/users/types';

export const USERS_QUERY_NAME = 'USERS';
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<unknown, AxiosResponse<User[]>>(
        API_ROUTES.GET_USERS_URL
    );
    return response.data;
};
