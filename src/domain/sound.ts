import { InstrumentName, Player } from 'soundfont-player';
import { MidiValue } from './note';
import { Optional } from './types';

export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>;

export const DEFAULT_INSTRUMENT: InstrumentName = 'synth_bass_1';
