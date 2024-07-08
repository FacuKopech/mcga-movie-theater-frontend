import env from 'dotenv';

env.config();

export const BACKEND_URL: string = process.env.VITE_APP_BACKEND_URL as string;
