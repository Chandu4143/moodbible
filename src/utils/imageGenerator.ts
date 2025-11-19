import html2canvas from 'html2canvas';

export const generateVerseImage = async (element: HTMLElement, verseReference: string) => {
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: '#FAFAF9', // Match app background
            scale: 2, // High resolution
            logging: false,
            useCORS: true,
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `mood-bible-${verseReference.replace(/[\s:]/g, '-')}.png`;
        link.click();
    } catch (error) {
        console.error('Error generating image:', error);
    }
};
