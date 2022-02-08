import * as DeviceDetect from 'react-device-detect';

// isTv Target
export const isTV             = process.env.REACT_APP_BUILD_TARGET.trim() === 'tv';
if (isTV)
    console.log('TV Build');

// Stubs
export const landscape        = () => {};
export const mobile           = () => {};
export const mobileSmall      = () => {};
export const tablet           = () => {};
export const desktopSmall     = () => {};
export const hover            = () => {};
export const tv               = () => {};

// Device / Navigator
export const isAndroid        = DeviceDetect.isAndroid;
export const isIOS            = DeviceDetect.isIOS;
export const isSafari         = DeviceDetect.isSafari;
export const isMobile         = DeviceDetect.isMobileOnly;
export const isMobileOrTablet = DeviceDetect.isMobile;
export const isChrome         = DeviceDetect.isChrome;

// Device capabilities
export const isStandalone = () => {
    return (window.matchMedia('(display-mode: standalone)').matches);
};

export const hasTouch = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

export const supportBackDropFilter = !isTV && (isSafari || CSS.supports('(backdrop-filter:blur(32px))'));
