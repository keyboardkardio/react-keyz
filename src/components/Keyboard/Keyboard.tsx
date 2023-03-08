import { selectKey } from '../../domain/keyboard';
import { MidiValue, notes } from '../../domain/note';
import { Key } from '../Key/Key';
import styles from './Keyboard.module.css';

export interface KeyboardProps {
    loading: boolean;
    play: (note: MidiValue) => Promise<void>;
    stop: (note: MidiValue) => Promise<void>;
}

export function Keyboard({ loading, stop, play }: KeyboardProps) {
    return (
        <div className={styles.keyboard}>
            {notes.map(({ midi, alteration, index, octave }) => {
                const label = selectKey(octave, index);
                return (
                    <Key
                        key={midi}
                        alteration={alteration}
                        label={label}
                        disabled={loading}
                        onDown={() => play(midi)}
                        onUp={() => stop(midi)}
                    />
                );
            })}
        </div>
    );
}
