import { useEffect, useState } from 'react';
import { Key as KeyLabel } from '../../domain/keyboard';

type IsPressed = boolean;
type EventCode = string;

interface Settings {
    keyToWatch: KeyLabel;
    onPressStart: Function;
    onPressEnd: Function;
}

function fromEventCode(code: EventCode): KeyLabel {
    const prefixRegex = /Key|Digit/gi;
    return code.replace(prefixRegex, '');
}

function equal(keyToWatch: KeyLabel, eventCode: EventCode): boolean {
    return fromEventCode(eventCode).toUpperCase() === keyToWatch.toUpperCase();
}

export function useKeyPress({ keyToWatch, onPressStart, onPressEnd }: Settings): IsPressed {
    const [isPressed, setIsPressed] = useState<IsPressed>(false);

    useEffect(() => {
        const handleKeyDown = ({ code }: KeyboardEvent) => {
            if (isPressed || !equal(keyToWatch, code)) return;
            setIsPressed(true);
            onPressStart();
        };

        const handleKeyUp = ({ code }: KeyboardEvent) => {
            if (isPressed || !equal(keyToWatch, code)) return;
            setIsPressed(false);
            onPressEnd();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [keyToWatch, isPressed, setIsPressed, onPressStart, onPressEnd]);

    return isPressed;
}
