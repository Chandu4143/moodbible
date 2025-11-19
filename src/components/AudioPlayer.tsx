import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Using a reliable ambient rain sound
    const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/02/07/audio_60025a2b8c.mp3?filename=rain-and-thunder-16705.mp3";

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                console.log('[AudioPlayer] Paused');
            } else {
                // Must wait for play promise to resolve
                await audioRef.current.play();
                setIsPlaying(true);
                console.log('[AudioPlayer] Playing');
            }
        } catch (error) {
            console.error('[AudioPlayer] Playback failed:', error);
            setIsPlaying(false);
            alert('Audio playback failed. Please try clicking the button again.');
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Low volume for ambience

            // Handle audio events
            const audio = audioRef.current;

            const handlePlay = () => {
                console.log('[AudioPlayer] Audio started playing');
                setIsPlaying(true);
            };

            const handlePause = () => {
                console.log('[AudioPlayer] Audio paused');
                setIsPlaying(false);
            };

            const handleError = (e: Event) => {
                console.error('[AudioPlayer] Audio error:', e);
                setIsPlaying(false);
            };

            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('error', handleError);

            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('error', handleError);
            };
        }
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />
            <button
                onClick={togglePlay}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-primary border border-secondary/20 hover:scale-110 active:scale-95"
                title={isPlaying ? "Mute Ambience" : "Play Ambience"}
                aria-label={isPlaying ? "Mute Ambience" : "Play Ambience"}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>
    );
};
