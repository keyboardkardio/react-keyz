import { OctaveIndex, PitchIndex } from './note';

export type Key = string;
export type Keys = Key[];

export const TOP_ROW_KEYS: Keys = Array.from('q2w3er5t6y7u');
export const BOTTOM_ROW_KEYS: Keys = Array.from('zsxdcvgbhnjm');

export function selectKey(octave: OctaveIndex, index: PitchIndex): Key {
    const keysRow = octave < 5 ? TOP_ROW_KEYS : BOTTOM_ROW_KEYS;

    return keysRow[index];
}
