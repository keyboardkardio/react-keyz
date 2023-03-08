import { InstrumentContextProvider } from '../../state/Instrument';
import { InstrumentSelector } from '../InstrumentSelector';
import { KeyboardWithInstrument } from '../Keyboard';

export function Playground() {
    
    return (
        <InstrumentContextProvider>
            <div className='playground'>
                <KeyboardWithInstrument />
                <InstrumentSelector />
            </div>
        </InstrumentContextProvider>
    );
}
