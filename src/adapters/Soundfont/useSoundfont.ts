import { useRef, useState } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';
import { MidiValue } from '../../domain/note';
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from '../../domain/sound';
import { Optional } from '../../domain/types';

type Settings = {
    AudioContext: AudioContextType;
};

interface Adapted {
    loading: boolean;
    current: Optional<InstrumentName>;
    load(instrument?: InstrumentName): Promise<void>;
    play(note: MidiValue): Promise<void>;
    stop(note: MidiValue): Promise<void>;
}

export function useSoundfont({ AudioContext }: Settings): Adapted {
    const [loading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
    const [player, setPlayer] = useState<Optional<Player>>(null);
    const audio = useRef(new AudioContext());

    let activeNodes: AudioNodesRegistry = {};

    const resume = async () => {
        return audio.current.state === 'suspended' ? await audio.current.resume() : Promise.resolve();
    };

    const load = async (instrument: InstrumentName = DEFAULT_INSTRUMENT) => {
        setLoading(true);

        const player = await Soundfont.instrument(audio.current, instrument);

        setLoading(false);
        setCurrent(instrument);
        setPlayer(player);
    };

    const play = async (note: MidiValue) => {
        await resume();

        if (!player) return;

        const node = player.play(note.toString());
        activeNodes = { ...activeNodes, [note]: node };
    };

    const stop = async (note: MidiValue) => {
        await resume();

        if (!activeNodes[note]) return;

        activeNodes[note]!.stop();
        activeNodes = { ...activeNodes, [note]: null };
    };

    return {
        loading,
        current,
        load,
        play,
        stop,
    };
}
