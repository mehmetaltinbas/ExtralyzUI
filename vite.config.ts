import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const env = loadEnv('', process.cwd(), '');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(env.VITE_PORT),
    },
    resolve: {
        alias: {
            // map "src" to your src folder
            src: path.resolve(__dirname, 'src'),
        },
    },
});
