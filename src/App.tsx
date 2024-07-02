import React from 'react';
import '@homework-task/styles.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { FormExample } from '@homework-task/components/FormExample';

// import { Landing } from '@homework-task/components/landing/Landing';
// import UserList from '@homework-task/components/users/UsersList';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <main>
                {/*<Landing />*/}
                {/*<UserList />*/}
                <FormExample />
            </main>
        </QueryClientProvider>
    );
}

export default App;
