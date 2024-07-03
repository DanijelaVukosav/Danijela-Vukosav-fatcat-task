import React from 'react';
import '@homework-task/styles.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { LayoutExample } from '@homework-task/components/layoutExample/LayoutExample';
// import { FormExample } from '@homework-task/components/formExample/FormExample';

// import { Landing } from '@homework-task/components/landing/Landing';
// import { UserList } from '@homework-task/components/users/UsersList';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <main>
                {/*<Landing />*/}
                {/*<UserList />*/}
                {/*<FormExample />*/}
                <LayoutExample />
            </main>
        </QueryClientProvider>
    );
}

export default App;
