import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const env = loadEnv('', process.cwd(), '');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(env.VITE_PORT)
    }
});
