import {StatusCodes} from 'http-status-codes';

const Codes = {
    ...StatusCodes,
    TOKEN_EXPIRED      : 498,
    NO_SERVER_AVAILABLE: 512,
};

export const GsCodes = {
    ALREADY_PLAYING: 612,
};

export default Codes;
