import clsx from 'clsx';
import { ReactEventHandler } from 'react';
import { NoteAlteration } from '../../domain/note';
import { useKeyPress } from '../PressObserver/useKeyPress';
import styles from './Key.module.css';

interface KeyProps {
    alteration: NoteAlteration;
    label: string;
    disabled?: boolean;
    onUp: ReactEventHandler<HTMLButtonElement>;
    onDown: ReactEventHandler<HTMLButtonElement>;
}

export function Key({ alteration, label, onDown, onUp, ...rest }: KeyProps) {
    const isPressed = useKeyPress({
        keyToWatch: label,
        onPressStart: onDown,
        onPressEnd: onUp,
    });

    return (
        <button
            className={clsx(styles.key, styles[alteration], isPressed && 'is-pressed')}
            onMouseDown={onDown}
            onMouseUp={onUp}
            type='button'
            {...rest}
        >
            {label}
        </button>
    );
}
