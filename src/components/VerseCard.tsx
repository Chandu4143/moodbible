import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { bibleService, type Verse } from '../services/BibleService';
import { Copy, ArrowLeft, BookOpen, Download } from 'lucide-react';
import { bookNames } from '../utils/bibleMapping';
import { generateVerseImage } from '../utils/imageGenerator';

interface VerseCardProps {
    verse: Verse;
    onBack: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, onBack }) => {
    const [showChapter, setShowChapter] = useState(false);
    const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);
    };

    const handleShare = () => {
        if (cardRef.current) {
            generateVerseImage(cardRef.current, verse.reference);
        }
    };

    const handleReadChapter = () => {
        if (!showChapter) {
            // Find book abbreviation
            const entry = Object.entries(bookNames).find(([, val]) => val === verse.book);
            const abbrev = entry ? entry[0] : '';

            if (abbrev) {
                const fullChapter = bibleService.getChapter(abbrev, verse.chapter);
                setChapterVerses(fullChapter);
            }
        }
        setShowChapter(!showChapter);
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

            <div ref={cardRef} className="p-8 rounded-2xl bg-background">
                {!showChapter ? (
                    <motion.div
                        key="single-verse"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-text mb-8">
                            "{verse.text}"
                        </p>
                        <p className="text-primary font-medium tracking-widest uppercase text-sm md:text-base">
                            {verse.reference}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="chapter-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-left max-h-[60vh] overflow-y-auto no-scrollbar pr-4"
                    >
                        <h3 className="text-2xl font-serif text-primary mb-6 text-center">{verse.book} {verse.chapter}</h3>
                        <div className="space-y-4">
                            {chapterVerses.map((v) => (
                                <p key={v.verse} className={`font-serif text-lg leading-relaxed ${v.verse === verse.verse ? 'text-primary font-medium bg-primary/5 p-2 rounded' : 'text-text-muted'}`}>
                                    <span className="text-xs text-gray-400 align-top mr-1">{v.verse}</span>
                                    {v.text}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

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
                    onClick={handleReadChapter}
                    className={`p-3 rounded-full hover:bg-secondary/10 transition-colors ${showChapter ? 'text-primary bg-secondary/10' : 'text-gray-400 hover:text-primary'}`}
                    title="Read Full Chapter"
                >
                    <BookOpen size={20} />
                </button>
                <button
                    onClick={handleShare}
                    className="p-3 rounded-full hover:bg-secondary/10 text-gray-400 hover:text-primary transition-colors"
                    title="Download Image"
                >
                    <Download size={20} />
                </button>
            </motion.div>
        </motion.div>
    );
};
