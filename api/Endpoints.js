// Backend endpoints
export const Endpoints = {
    AUTH               : 'front/auth',
    REFRESH_TOKEN      : 'front/token/refresh',
    FRONTEND_HELPER    : 'front/frontendHelper',
    CONFIG_FRONT       : 'front/config/front',
    SIGN_TERMS_AND_COND: 'front/player/signTermsAndConditions',
    PROFILES           : 'front/profiles',
    STATS              : 'front/stats',
    FAVORITES          : {
        ADD   : 'front/addFavourite',
        REMOVE: 'front/removeFavourite'
    },
    CHECK_PASSWORD     : 'front/player/checkPassword',
    CHECK_PIN_CODE     : 'front/profile/checkPinCode',
    PASSWORD_RESET     : {
        GET_METHOD : 'front/password_reset/get_method',
        ASK_CODE   : 'front/password_reset/ask_code',
        VERIFY_CODE: 'front/password_reset/verify_code',
        RESET      : 'front/password_reset/reset',
    },
    GAMES              : 'front/get_apps2',
    EULA               : {
        GET    : 'front/game/eula',
        APPROVE: 'front/game/eula/approveEula'
    },
    START_SESSION      : 'front/session_start',
    JOIN_SESSION       : 'front/join_session_multi',
    SGX_FILES          : 'cgx/sgx_files'
};
