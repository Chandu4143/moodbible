import bibleData from '../data/en_kjv.json';
import { getBookName } from '../utils/bibleMapping';

export interface Verse {
    text: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string;
}

export interface VerseReference {
    book: string; // abbreviation
    chapter: number;
    verse: number;
}

class BibleService {
    private data: any[];

    constructor() {
        this.data = bibleData;
    }

    getVerse(ref: VerseReference): Verse | null {
        const bookData = this.data.find((b: any) => b.abbrev.toLowerCase() === ref.book.toLowerCase());
        if (!bookData) return null;

        const chapterData = bookData.chapters[ref.chapter - 1];
        if (!chapterData) return null;

        const verseText = chapterData[ref.verse - 1];
        if (!verseText) return null;

        const bookName = getBookName(ref.book);

        return {
            text: verseText,
            book: bookName,
            chapter: ref.chapter,
            verse: ref.verse,
            reference: `${bookName} ${ref.chapter}:${ref.verse}`
        };
    }

    // Simple search fallback
    search(query: string): Verse[] {
        const results: Verse[] = [];
        const lowerQuery = query.toLowerCase();

        // Limit search to avoid performance hit
        let count = 0;
        const MAX_RESULTS = 5;

        for (const book of this.data) {
            const bookName = getBookName(book.abbrev);
            for (let c = 0; c < book.chapters.length; c++) {
                const chapter = book.chapters[c];
                for (let v = 0; v < chapter.length; v++) {
                    const text = chapter[v];
                    if (text.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            text,
                            book: bookName,
                            chapter: c + 1,
                            verse: v + 1,
                            reference: `${bookName} ${c + 1}:${v + 1}`
                        });
                        count++;
                        if (count >= MAX_RESULTS) return results;
                    }
                }
            }
        }
        return results;
    }
}

export const bibleService = new BibleService();
