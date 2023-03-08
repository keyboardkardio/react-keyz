import React, { useState } from 'react';
import { DEFAULT_INSTRUMENT } from '../../domain/sound';
import { InstrumentContext } from './Context';

export function InstrumentContextProvider({ children, ...props }: { children: React.ReactNode }) {
    const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

    return (
        <InstrumentContext.Provider value={{ instrument, setInstrument }} {...props}>
            {children}
        </InstrumentContext.Provider>
    );
}
