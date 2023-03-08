// Union type of numbers that represents the octaves of musical notes.
export type OctaveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Union type of string literals that represents the pitches of musical notes.
export type PitchName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

// Union type of string literals that represents the possible alterations a note can have.
export type NoteAlteration = 'sharp' | 'flat' | 'natural';

// This may seem pointless but will prove to be useful when typing function arguments.
export type PitchIndex = number;
export type MidiValue = number;

export interface Note {
    midi: MidiValue;
    alteration: NoteAlteration;
    pitch: PitchName;
    index: PitchIndex;
    octave: OctaveIndex;
}

// Assign MIDI note numbers.
const C1_MIDI_NUMBER = 24;
const C4_MIDI_NUMBER = 60;
const B5_MIDI_NUMBER = 83;

// Define keyboard range.
export const LOWER_NOTE = C4_MIDI_NUMBER;
export const HIGHER_NOTE = B5_MIDI_NUMBER;

export const SEMITONES_IN_OCTAVE = 12;
export const NATURAL_PITCH_INDICES: PitchIndex[] = [0, 2, 4, 5, 7, 9, 11];

// Object that maps pitch indices to its corresponding pitch names.
export const PITCHES_REGISTRY: Record<PitchIndex, PitchName> = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B',
};

// Takes a `MidiValue` as an argument and returns an object with information about the corresponding note.
export function getNoteDetails(midi: MidiValue): { octave: OctaveIndex; pitch: PitchName; index: PitchIndex; alteration: NoteAlteration } {

    // Find the octave in which the note is in.
    const pianoRange = midi - C1_MIDI_NUMBER;
    const octave = (Math.floor(pianoRange / SEMITONES_IN_OCTAVE) + 1) as OctaveIndex;

    // Identify pitch based on its index.
    const index = pianoRange % SEMITONES_IN_OCTAVE;
    const pitch = PITCHES_REGISTRY[index];

    // Determine if the note is altered or not.
    const alteration: NoteAlteration = NATURAL_PITCH_INDICES.includes(index) ? 'natural' : 'sharp';

    return { octave, pitch, index, alteration };
}

interface NotesGeneratorSettings {
    fromNote?: MidiValue;
    toNote?: MidiValue;
}

// Generates a set of notes using the contraints defined above.
export function generateNotes({ fromNote = LOWER_NOTE, toNote = HIGHER_NOTE }: NotesGeneratorSettings = {}): Note[] {
    
    return Array(toNote - fromNote + 1)
        .fill(0)
        .map((_, index: number) => {
            const midi = fromNote + index;
            const { octave, pitch, index: pitchIndex, alteration } = getNoteDetails(midi);
            return { octave, pitch, index: pitchIndex, alteration, midi };
        });
}

export const notes = generateNotes();
