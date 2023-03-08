import { useAudioContext } from '../AudioContextProvider/useAudioContext';
import { NoAudioMessage } from '../NoAudioMessage/NoAudioMessage';
import { Playground } from '../Playground';

export function Main() {
    const AudioContext = useAudioContext();

    return !!AudioContext ? <Playground /> : <NoAudioMessage />;
}
