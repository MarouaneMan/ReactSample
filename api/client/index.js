import {setupInterceptors as setupPrivateInterceptors} from './PrivateClient';
import {setupInterceptors as setupPublicInterceptors} from './PublicClient';

// Use this client to access to protected endpoints
// Authentication barrier is added to request headers
// Tokens are refreshed whenever it is required
export {PrivateClient} from './PrivateClient';

// Use this client for any other cases
export {PublicClient} from './PublicClient';

// Setup interceptors before any axios request
setupPrivateInterceptors();
setupPublicInterceptors();
