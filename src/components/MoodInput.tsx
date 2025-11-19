import { useState } from 'react';
import { motion } from 'framer-motion';
import { moods } from '../data/moods';
import { Search } from 'lucide-react';

interface MoodInputProps {
    onMoodSelect: (moodId: string) => void;
    onSearch: (query: string) => void;
}

export const MoodInput: React.FC<MoodInputProps> = ({ onMoodSelect, onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-primary-dark mb-4 tracking-tight">
                    How are you feeling?
                </h1>
                <p className="text-text-muted text-lg font-light">
                    Find comfort in scripture, tailored to your heart.
                </p>
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mb-12"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type how you feel..."
                    className="w-full bg-white/80 backdrop-blur-sm border border-secondary/20 rounded-full text-2xl md:text-3xl py-6 px-12 text-center focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm placeholder:text-gray-300 font-serif text-text"
                />
                <button
                    type="submit"
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-2"
                >
                    <Search size={24} />
                </button>
            </motion.form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-3"
            >
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        onClick={() => onMoodSelect(mood.id)}
                        className="px-6 py-2 rounded-full border border-secondary-light/50 text-text-muted hover:border-primary hover:text-primary hover:bg-white transition-all duration-300 text-sm tracking-wide"
                    >
                        {mood.label}
                    </button>
                ))}
            </motion.div>
        </div>
    );
};
