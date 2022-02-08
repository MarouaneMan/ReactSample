import axios from 'axios';
import ClientOptions from './ClientOptions';

export const PublicClient = axios.create(ClientOptions);

export function setupInterceptors()
{
    // Do nothing for now
}
