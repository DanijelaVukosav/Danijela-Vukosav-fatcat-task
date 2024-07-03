import { FC } from 'react';

import { useQuery } from 'react-query';

import { List } from '@homework-task/components/common/List';
import { Error } from '@homework-task/components/Error';
import { Loading } from '@homework-task/components/Loading';
import { User } from '@homework-task/components/users/types';
import {
    fetchUsers,
    USERS_QUERY_NAME,
} from '@homework-task/components/users/userService';

const PREDEFINED_USER_PROPERTIES: Array<keyof User> = [
    'id',
    'name',
    'username',
    'email',
    'phone',
];

export const UserList: FC = () => {
    const {
        data: users,
        error,
        isLoading,
    } = useQuery<User[], Error, User[]>(USERS_QUERY_NAME, fetchUsers);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message} />;

    return (
        <div>
            <h1 className={'text-2xl text-center p-10'}>User List</h1>
            <List<User> properties={PREDEFINED_USER_PROPERTIES} items={users} />
        </div>
    );
};
