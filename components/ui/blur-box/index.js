import {supportBackDropFilter} from 'app/device';
import {BlurBoxBase} from './BlurBox';
import {BlurBoxFallback} from './BlurBoxFallback';

export const BlurBox = !supportBackDropFilter ? BlurBoxFallback : BlurBoxBase;
