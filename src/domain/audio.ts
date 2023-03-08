import { Optional } from './types';

/*
 *
 * This is a helper function that checks whether or not the browser supports 
 * the `AudioContext`, an interface that provides access to the audio API.
 */
export function accessContext(): Optional<AudioContextType> {
    return window.AudioContext || window.webkitAudioContext || null;
}
