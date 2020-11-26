let local = true;

export const API_URL = local
    ? 'http://localhost:8000'
    : 'http://18.188.219.228:8000';
export const ENDPOINT = local ? 'localhost:8000' : '18.188.219.228:8000';
