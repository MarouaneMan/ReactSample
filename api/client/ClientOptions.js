// API base url
const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ClientOptions = {
    baseURL       : API_BASE_URL,
    timeout       : 10000,
    ResponseType  : 'json',
    validateStatus: null,
};

export default ClientOptions;
