import { getMoodById } from '../data/moods';
import type { VerseReference } from './BibleService';

class RecommendationService {
    private history: Set<string>;
    private readonly STORAGE_KEY = 'mood_bible_history';

    constructor() {
        this.history = new Set();
        this.loadHistory();
    }

    private loadHistory() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.history = new Set(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load history', e);
        }
    }

    private saveHistory() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(this.history)));
        } catch (e) {
            console.error('Failed to save history', e);
        }
    }

    private serializeRef(ref: VerseReference): string {
        return `${ref.book}:${ref.chapter}:${ref.verse}`;
    }

    getVerseForMood(moodId: string): VerseReference | null {
        const mood = getMoodById(moodId);
        if (!mood || mood.verses.length === 0) return null;

        // Filter out verses we've already seen
        const unseen = mood.verses.filter(ref => !this.history.has(this.serializeRef(ref)));

        let selectedRef: VerseReference;

        if (unseen.length > 0) {
            // Pick a random unseen verse
            const index = Math.floor(Math.random() * unseen.length);
            selectedRef = unseen[index];
        } else {
            // If we've seen them all, pick random from all
            const index = Math.floor(Math.random() * mood.verses.length);
            selectedRef = mood.verses[index];
        }

        // Track this view
        this.history.add(this.serializeRef(selectedRef));
        this.saveHistory();

        return selectedRef;
    }

    clearHistory() {
        this.history.clear();
        this.saveHistory();
    }
}

export const recommendationService = new RecommendationService();
