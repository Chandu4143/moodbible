import type { VerseReference } from '../services/BibleService';

export interface Mood {
    id: string;
    label: string;
    color: string; // Tailwind class or hex
    verses: VerseReference[];
}

export const moods: Mood[] = [
    {
        id: 'anxious',
        label: 'Anxious',
        color: 'bg-secondary',
        verses: [
            { book: 'ph', chapter: 4, verse: 6 }, // Phil 4:6
            { book: 'ph', chapter: 4, verse: 7 }, // Phil 4:7
            { book: '1pe', chapter: 5, verse: 7 }, // 1 Peter 5:7
            { book: 'ps', chapter: 23, verse: 1 }, // Psalm 23:1
            { book: 'mt', chapter: 6, verse: 34 }, // Matt 6:34
        ]
    },
    {
        id: 'sad',
        label: 'Sad',
        color: 'bg-blue-400', // Muted blue
        verses: [
            { book: 'ps', chapter: 34, verse: 18 }, // Psalm 34:18
            { book: 'mt', chapter: 5, verse: 4 }, // Matt 5:4
            { book: 'jn', chapter: 14, verse: 27 }, // John 14:27
            { book: 're', chapter: 21, verse: 4 }, // Rev 21:4
        ]
    },
    {
        id: 'lonely',
        label: 'Lonely',
        color: 'bg-indigo-400',
        verses: [
            { book: 'is', chapter: 41, verse: 10 }, // Isaiah 41:10
            { book: 'dt', chapter: 31, verse: 6 }, // Deut 31:6
            { book: 'ps', chapter: 27, verse: 10 }, // Psalm 27:10
            { book: 'mt', chapter: 28, verse: 20 }, // Matt 28:20
        ]
    },
    {
        id: 'angry',
        label: 'Angry',
        color: 'bg-red-400', // Soft red
        verses: [
            { book: 'jm', chapter: 1, verse: 19 }, // James 1:19
            { book: 'jm', chapter: 1, verse: 20 }, // James 1:20
            { book: 'ep', chapter: 4, verse: 26 }, // Eph 4:26
            { book: 'pr', chapter: 15, verse: 1 }, // Prov 15:1
        ]
    },
    {
        id: 'grateful',
        label: 'Grateful',
        color: 'bg-yellow-400', // Soft gold
        verses: [
            { book: '1th', chapter: 5, verse: 18 }, // 1 Thess 5:18
            { book: 'ps', chapter: 118, verse: 24 }, // Psalm 118:24
            { book: 'ps', chapter: 107, verse: 1 }, // Psalm 107:1
            { book: 'jm', chapter: 1, verse: 17 }, // James 1:17
        ]
    },
    {
        id: 'tired',
        label: 'Tired',
        color: 'bg-stone-400',
        verses: [
            { book: 'mt', chapter: 11, verse: 28 }, // Matt 11:28
            { book: 'is', chapter: 40, verse: 31 }, // Isaiah 40:31
            { book: 'ps', chapter: 4, verse: 8 }, // Psalm 4:8
            { book: 'gl', chapter: 6, verse: 9 }, // Gal 6:9
        ]
    },
    {
        id: 'overwhelmed',
        label: 'Overwhelmed',
        color: 'bg-teal-400',
        verses: [
            { book: 'ps', chapter: 61, verse: 2 }, // Psalm 61:2
            { book: 'is', chapter: 43, verse: 2 }, // Isaiah 43:2
            { book: 'mt', chapter: 6, verse: 34 }, // Matt 6:34
        ]
    },
    {
        id: 'hopeful',
        label: 'Hopeful',
        color: 'bg-sky-400',
        verses: [
            { book: 'jr', chapter: 29, verse: 11 }, // Jer 29:11
            { book: 'rm', chapter: 15, verse: 13 }, // Rom 15:13
            { book: 'hb', chapter: 11, verse: 1 }, // Heb 11:1
        ]
    },
    {
        id: 'guilty',
        label: 'Guilty',
        color: 'bg-slate-400',
        verses: [
            { book: '1jn', chapter: 1, verse: 9 }, // 1 John 1:9
            { book: 'rm', chapter: 8, verse: 1 }, // Rom 8:1
            { book: 'ps', chapter: 103, verse: 12 }, // Psalm 103:12
        ]
    },
    {
        id: 'peaceful',
        label: 'Peaceful',
        color: 'bg-emerald-400',
        verses: [
            { book: 'jn', chapter: 14, verse: 27 }, // John 14:27
            { book: 'ph', chapter: 4, verse: 7 }, // Phil 4:7
            { book: 'is', chapter: 26, verse: 3 }, // Isaiah 26:3
        ]
    }
];

export const getMoodById = (id: string) => moods.find(m => m.id === id);
