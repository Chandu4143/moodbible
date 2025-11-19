import { motion } from 'framer-motion';
import type { Verse } from '../services/BibleService';
import { Share2, Copy, ArrowLeft } from 'lucide-react';

interface VerseCardProps {
    verse: Verse;
    onBack: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, onBack }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);
        // Could add a toast here
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto px-6 py-12 text-center relative min-h-[60vh] flex flex-col justify-center"
        >
            <button
                onClick={onBack}
                className="absolute top-0 left-6 text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-text mb-8">
                    "{verse.text}"
                </p>
                <p className="text-primary font-medium tracking-widest uppercase text-sm md:text-base">
                    {verse.reference}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 flex justify-center gap-6"
            >
                <button
                    onClick={handleCopy}
                    className="p-3 rounded-full hover:bg-secondary/10 text-gray-400 hover:text-primary transition-colors"
                    title="Copy to clipboard"
                >
                    <Copy size={20} />
                </button>
                <button
                    className="p-3 rounded-full hover:bg-secondary/10 text-gray-400 hover:text-primary transition-colors"
                    title="Share"
                >
                    <Share2 size={20} />
                </button>
            </motion.div>
        </motion.div>
    );
};
