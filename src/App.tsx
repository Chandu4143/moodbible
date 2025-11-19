import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoodInput } from './components/MoodInput';
import { VerseCard } from './components/VerseCard';
import { bibleService, type Verse } from './services/BibleService';
import { getMoodById } from './data/moods';

function App() {
  const [view, setView] = useState<'input' | 'loading' | 'verse'>('input');
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);

  const handleMoodSelect = async (moodId: string) => {
    setView('loading');

    // Simulate a "breathing" moment for effect
    setTimeout(() => {
      const mood = getMoodById(moodId);
      if (mood && mood.verses.length > 0) {
        // Pick a random verse from the mood
        const randomRef = mood.verses[Math.floor(Math.random() * mood.verses.length)];
        const verse = bibleService.getVerse(randomRef);
        if (verse) {
          setCurrentVerse(verse);
          setView('verse');
        } else {
          // Fallback if something goes wrong
          setView('input');
        }
      }
    }, 1500);
  };

  const handleSearch = async (query: string) => {
    setView('loading');
    setTimeout(() => {
      const results = bibleService.search(query);
      if (results.length > 0) {
        setCurrentVerse(results[0]); // Just show the first one for now for focus
        setView('verse');
      } else {
        // Handle no results (could add a toast or error state)
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
