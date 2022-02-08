import {supportBackDropFilter} from 'app/device';
import {BlurMenuBaseFallback} from './BlurMenuFallback';
import {BlurMenuBase} from './BlurMenuBase';

export const BlurMenu = !supportBackDropFilter ? BlurMenuBaseFallback : BlurMenuBase;
