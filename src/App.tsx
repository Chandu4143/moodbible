import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoodInput } from './components/MoodInput';
import { VerseCard } from './components/VerseCard';
import { bibleService, type Verse } from './services/BibleService';
import { getMoodById } from './data/moods';
import { recommendationService } from './services/RecommendationService';
import { AudioPlayer } from './components/AudioPlayer';

function App() {
  const [view, setView] = useState<'input' | 'loading' | 'verse'>('input');
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);

  const handleMoodSelect = async (moodId: string) => {
    setView('loading');

    // Simulate a "breathing" moment for effect (faster now)
    setTimeout(() => {
      const mood = getMoodById(moodId);
      console.log('[handleMoodSelect] Selected mood:', moodId, mood);

      if (!mood || mood.verses.length === 0) {
        console.error('[handleMoodSelect] No mood found or no verses for:', moodId);
        // Absolute fallback: peaceful mood
        const peacefulMood = getMoodById('peaceful');
        if (peacefulMood && peacefulMood.verses.length > 0) {
          const verse = bibleService.getVerse(peacefulMood.verses[0]);
          if (verse) {
            setCurrentVerse(verse);
            setView('verse');
            return;
          }
        }
        setView('input');
        return;
      }

      const verseRef = recommendationService.getVerseForMood(moodId);
      console.log('[handleMoodSelect] Selected verse ref:', verseRef);

      if (verseRef) {
        const verse = bibleService.getVerse(verseRef);
        console.log('[handleMoodSelect] Retrieved verse:', verse);

        if (verse) {
          setCurrentVerse(verse);
          setView('verse');
        } else {
          console.error('[handleMoodSelect] Failed to get verse for ref:', verseRef);
          // Try first verse from mood as fallback
          const fallbackVerse = bibleService.getVerse(mood.verses[0]);
          if (fallbackVerse) {
            setCurrentVerse(fallbackVerse);
            setView('verse');
          } else {
            setView('input');
          }
        }
      } else {
        console.error('[handleMoodSelect] recommendationService returned null');
        // Try first verse from mood as fallback
        const fallbackVerse = bibleService.getVerse(mood.verses[0]);
        if (fallbackVerse) {
          setCurrentVerse(fallbackVerse);
          setView('verse');
        } else {
          setView('input');
        }
      }
    }, 800);
  };

  const handleSearch = async (query: string) => {
    setView('loading');

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();

      // 1. Check for direct mood matches (e.g. "I am lonely")
      const stopWords = ['i', 'feel', 'like', 'im', 'am', 'so', 'very', 'feeling', 'my', 'me', 'is', 'the', 'a', 'to', 'because', 'just'];
      const keywords = lowerQuery.split(/[\s,.]+/).filter(w => !stopWords.includes(w) && w.length > 2);

      // If "alone" is in keywords, map to "lonely" mood?
      if (keywords.includes('alone') || keywords.includes('lonely')) {
        handleMoodSelect('lonely');
        return;
      }
      if (keywords.includes('anxious') || keywords.includes('worry') || keywords.includes('worried')) {
        handleMoodSelect('anxious');
        return;
      }
      if (keywords.includes('sad') || keywords.includes('cry') || keywords.includes('depressed')) {
        handleMoodSelect('sad');
        return;
      }

      // 2. Text Search with first significant keyword
      const searchTerm = keywords.length > 0 ? keywords[0] : lowerQuery;
      let results = bibleService.search(searchTerm);

      if (results.length === 0 && keywords.length > 1) {
        // Try second keyword if first failed
        results = bibleService.search(keywords[1]);
      }

      if (results.length > 0) {
        // Pick a random one from top 3 results to vary it up
        const index = Math.floor(Math.random() * Math.min(results.length, 3));
        setCurrentVerse(results[index]);
        setView('verse');
      } else {
        // 3. Fallback: Show a "Peaceful" verse if nothing found
        const mood = getMoodById('peaceful');
        if (mood && mood.verses.length > 0) {
          const randomRef = mood.verses[Math.floor(Math.random() * mood.verses.length)];
          const verse = bibleService.getVerse(randomRef);
          if (verse) {
            setCurrentVerse(verse);
            setView('verse');
            return;
          }
        }
        setView('input');
      }
    }, 1500);
  };

  const handleBack = () => {
    setView('input');
    setCurrentVerse(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <AudioPlayer />

      {/* Ambient Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-breathe pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px] animate-breathe pointer-events-none" style={{ animationDelay: '2s' }} />

      <AnimatePresence mode="wait">
        {view === 'input' && (
          <motion.div
            key="input"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full z-10"
          >
            <MoodInput onMoodSelect={handleMoodSelect} onSearch={handleSearch} />
          </motion.div>
        )}

        {view === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-text-muted font-serif italic">Finding comfort...</p>
          </motion.div>
        )}

        {view === 'verse' && currentVerse && (
          <motion.div
            key="verse"
            className="w-full z-10"
          >
            <VerseCard verse={currentVerse} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
