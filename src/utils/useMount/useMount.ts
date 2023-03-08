import { EffectCallback, useEffect } from 'react';

function useEffectOnce(effect: EffectCallback) {
    useEffect(effect, []);
}

export function useMount(fn: Function) {
    useEffectOnce(() => {
        fn();
    });
}
