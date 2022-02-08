import {Endpoints, PrivateClient as client} from 'api';
import {doRequest, StatusCodes} from 'helpers';
import {GsCodes} from 'helpers/StatusCodes';

class GameSession {

    StartSession(params)
    {
        let data = {
            'profile'      : params.profileUID,
            'alias'        : params.gameAlias,
            'language'     : params.language,
            'gamepad'      : params.useGamepad,
            'pinCodeCheck' : params.pinCode,
            'fps'          : params.fps,
            'bitrate'      : params.bitrate,
            'resolution'   : params.resolution,
            'platform'     : params.platform,
            'screen-width' : window.screen.width,
            'screen-height': window.screen.height
        };

        let endPoint = Endpoints.START_SESSION;

        // MultiPlayer
        if (params.multiplayer?.isMultiplayer)
        {
            data['multiplayer-mode'] = 'quickmatch';
            if (params.multiplayer.owner)
            {
                data['lobby-structure'] = JSON.stringify(params.multiplayer.lobbyStructure);
            }
            else
            {
                endPoint = Endpoints.JOIN_SESSION;
                data     = {
                    'alias'           : params.gameAlias,
                    'language'        : 'en',
                    'gamepad'         : true,
                    'profile'         : params.profileUID,
                    'screen-width'    : window.screen.width,
                    'screen-height'   : window.screen.height,
                    'multiplayer-mode': 'quickmatch',
                    'masterSessionKey': params.multiplayer.masterSessionKey,
                    'platform'        : params.platform,
                };
            }
        }

        return doRequest({

            request: client.post(endPoint, data),

            [StatusCodes.OK]: ({data}) => data,

            [StatusCodes.NO_SERVER_AVAILABLE]: {
                type : 'info',
                error: 'game_session.no_server_available'
            },

            [StatusCodes.FORBIDDEN]: ({data}) => {
                switch (data.gsStatusCode)
                {
                    case GsCodes.ALREADY_PLAYING:
                        return {
                            type : 'info',
                            error: 'game_session.already_playing'
                        };
                    default:
                        return {
                            type : 'error',
                            error: 'error.internal'
                        };
                }
            }
        });
    }

    LoadSGXConfig({sessionId, fps})
    {
        return doRequest({

            request: client.get(`${Endpoints.SGX_FILES}/${sessionId}.sgx`),

            [StatusCodes.OK]: ({data}) => {

                // Parse virtual pad config
                let parseVirtualPadConfig = (str) => {
                    let virtualConfig = {};
                    const regex = /\s*(.+?)\s*:\s+(-?\d+,-?\d+(?:,-?\d+)?)/gm;
                    while ((m = regex.exec(str)) !== null) {
                        if (m.index === regex.lastIndex)
                            regex.lastIndex++;
                        if (m.length === 3)
                            virtualConfig[m[1]] = m[2];
                    }

                    // Dirty fix for remy's aspect-ratio
                    virtualConfig.GamepadGrid = '16,9';

                    return virtualConfig;
                }

                // Parse SGXConfig
                const regex = /(.+?):\s+(?:")?(.+?)(?:$|")/gm;
                let m;
                let options = {};
                while ((m = regex.exec(data)) !== null) {
                    if (m.index === regex.lastIndex)
                        regex.lastIndex++;
                    if (m.length === 3) {
                        if (m[1] === 'virtualpad-config-normal' || m[1] === 'virtualpad-config-touchscreen')
                            options[m[1]] = parseVirtualPadConfig(m[2]);
                        else
                            options[m[1]] = m[2];
                    }
                }

                // Set command line for tizen NACL client
                let cmdLineConfig =
                        options['ip'] + '  ' +
                        options['width'] + ' ' +
                        options['height'] + ' ' +
                        options['bitrate'] + ' ' +
                        options['video-port'] + ' ' +
                        options['input-port'] + ' ' +
                        options['audio-port'] + ' 0 ' +
                        fps + ' ' +
                        options['key'];

                return {
                    cmdLine: cmdLineConfig,
                    options: options
                };
            },
        });

    }
}

export default new GameSession();
