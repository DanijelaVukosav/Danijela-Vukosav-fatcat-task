import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    console.log('env1', env);
    console.log('env2', process.cwd());
    const __CWD__ = process.cwd();

    return {
        // vite config
        plugins: [react()],
        resolve: {
            alias: [
                {
                    find: '@homework-task',
                    replacement: path.resolve(__dirname, './src'),
                },
            ],
        },
        define: {
            __APP_ENV__: env.APP_ENV,
            __CWD__: JSON.stringify(process.cwd()),
            VITE_APP_YOUR_KEY: JSON.stringify(process.cwd()),
        },
    };
});
