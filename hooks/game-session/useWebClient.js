import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameSessionSelector, sessionTerminated, setSessionError} from 'slices';
import CGXClient from 'cgxwebclient';
import 'cgxwebclient/static/cgx.css';
import SplashScreen from 'assets/images/splashscreen.jpg';
import {isMobileOrTablet} from 'app/device';
import {useTranslation} from 'react-i18next';
import * as VirtualPadAssets from './VirtualPadAssets';

export function useWebClient({enableVirtualGamepad})
{
    const containerRef = useRef();
    const {SGXConfig}  = useSelector(gameSessionSelector);
    const dispatch     = useDispatch();
    const {t}          = useTranslation();

    useEffect(() => {
        const cgxInstance = new CGXClient({
            container                       : containerRef.current,
            host                            : SGXConfig.options['ip'],
            secured                         : true,
            video_port                      : SGXConfig.options['video-port'],
            input_port                      : SGXConfig.options['input-port'],
            audio_port                      : SGXConfig.options['audio-port'],
            clip_port                       : 0,
            micro_port                      : 0,
            datachannel_port                : 0,
            width                           : SGXConfig.options['width'],
            height                          : SGXConfig.options['height'],
            fps                             : 30,
            fill_window                     : true,
            center_in_window                : true,
            change_desktop_res              : false,
            bitrate                         : parseInt(SGXConfig.options['bitrate'], 10),
            keyboard_version                : 3,
            keyboard_layout                 : 'azerty',
            use_audio                       : true,
            use_input                       : true,
            use_keyboard                    : true,
            use_mouse                       : true,
            use_gamepad                     : true,
            use_gamepad_ex                  : false,
            use_virtual_gamepad             : enableVirtualGamepad,
            virtual_gamepad_config          : SGXConfig.options['virtualpad-config-normal'],
            use_touch                       : true,
            use_clipboard                   : false,
            use_microphone                  : false,
            mouse_relative                  : false,
            mouse_local                     : SGXConfig.options['mouse-local'] === 'on',
            video_force_soft                : false,
            audio_force_soft                : false,
            input_force_tcp                 : false,
            force_flash_http                : false, // legacy flash flag, always set it to false
            force_flash                     : false,
            use_rtc_proxy                   : true,
            force_rtc_proxy                 : true,
            force_rtc_tcp                   : SGXConfig.options['network_is_wifi'] === "on",
            use_cgx_proxy                   : true,
            cgx_proxy_mode                  : 'stream',
            local_id                        : 2,
            toolbar_supported_resolutions   : ['1920x1080/16', '1280x720/8', '864x486/4', '640x360/2'],
            toolbar_supported_bitrate       : [16, 8, 4, 2],
            toolbar_enable_bitrate_choice   : false,
            toolbar_enable_resolution_choice: false,
            toolbar_enable_gamepad          : true,
            toolbar_enable_file_upload      : false,
            file_upload_max_size_mb         : 100, // MegaBytes
            toolbar_default_hidden          : false,
            toolbar_force_display_mode      : isMobileOrTablet ? 'hidden' : 'toggle',
            virtualpad_assets               : {
                lBtA       : VirtualPadAssets['lBtA'],
                lBtB       : VirtualPadAssets['lBtB'],
                lBtX       : VirtualPadAssets['lBtX'],
                lBtY       : VirtualPadAssets['lBtY'],
                lBtStart   : VirtualPadAssets['lBtStart'],
                lBtSelect  : VirtualPadAssets['lBtSelect'],
                lBtL       : VirtualPadAssets['lBtL'],
                lBtR       : VirtualPadAssets['lBtR'],
                lBtL3      : VirtualPadAssets['lBtL3'],
                lBtR3      : VirtualPadAssets['lBtR3'],
                lPadD      : VirtualPadAssets['lPadD'],
                lPadL      : VirtualPadAssets['lPadL'],
                lPadR      : VirtualPadAssets['lPadR'],
                lBtRTr     : VirtualPadAssets['lBtRTr'],
                lBtLTr     : VirtualPadAssets['lBtLTr'],
            },
            style_path                      : null,
            splash_screen                   : SplashScreen,
            flash_path                      : null,
            software_decode_warning         : 'Your browser or network setup is not optimized for ultra low latency streaming, please try again using Chrome.',
            enable_sound                    : t('game_session.activate_sound'),
            auth_key                        : SGXConfig.options['enc'],
            debug                           : false,
        });

        cgxInstance.on('connected', () => {
            // Connected
            console.log('[WEB_CLIENT] connected');
        });

        cgxInstance.on('disconnected', () => {
            // Session terminated
            console.log('[WEB_CLIENT] disconnected');
            dispatch(sessionTerminated());
        });

        cgxInstance.on('error', (error) => {
            // Error
            console.log('[WEB_CLIENT] error: ', error);
            dispatch(setSessionError({
                type : 'error',
                error: 'game_session.unable_to_join_sever'
            }));
        });

        cgxInstance.Setup();
        cgxInstance.Resize(window.innerWidth, window.innerHeight);
        window.CGXClient        = CGXClient;
        CGXClient.resizeHandler = () => {
            cgxInstance.Resize(window.innerWidth, window.innerHeight);
        };
        cgxInstance.Start();

        return () => {
            try
            {
                cgxInstance.Stop();
            }
            catch (e)
            {
            }
        };
    }, []);

    return containerRef;
}
