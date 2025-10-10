const isProd = process.env.NODE_ENV === 'production';
export const IMAGE_PATH = isProd ? '/basic-webapp/frontend/' : 'http://localhost:8080/frontend/';
