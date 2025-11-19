# Mood Bible

A web application that meets you where you are, emotionally and spiritually.

## What is Mood Bible?

We all have those moments. Maybe you're feeling anxious at 2 AM, or grateful after a long day, or just need something to hold onto when words fail you. Mood Bible is here for those moments.

This lightweight web app helps you find Bible verses and passages that actually speak to how you're feeling right now. No endless scrolling, no hunting through chapters wondering where to start. Just type in your mood, maybe share a bit more if you want to, and we'll help you find scripture that feels like it was written for this exact moment.

## Why does this exist?

Here's the thing: the Bible is full of comfort, wisdom, and encouragement. But when you're in the middle of feeling something deeply, it's hard to know where to look. You might search for "verses about anxiety" and get a wall of results that don't quite hit right. Or you open a Bible app and stare at Genesis 1:1, unsure where to go from there.

We built Mood Bible because finding relevant scripture shouldn't be another source of stress. It should be as simple as saying "I'm feeling lonely" or "I'm worried about tomorrow" and getting back verses that actually help.

## Who is this for?

**People seeking quick spiritual comfort or guidance**  
When you need something right now, not after an hour of searching.

**New Bible readers**  
You don't need to know the difference between Psalms and Proverbs to find what you need.

**Daily reflection builders**  
Check in with yourself and find a verse that matches your day. Build the habit without the friction.

**Pastors and counselors**  
Looking for mood-linked scripture suggestions for conversations, devotionals, or just your own reflection.

## How it works

The experience is intentionally simple:

1. **Tell us how you're feeling** - Pick a quick mood or type your own. Add context if you want ("I'm anxious because of an interview tomorrow")
2. **Get relevant verses** - We return 1-3 carefully matched verses with brief explanations of why they fit
3. **Explore deeper** - Save verses, share them, read the full chapter, or find more like them

That's it. One interaction, and you have scripture that speaks to your moment.

## What we care about

**Speed and simplicity**  
You shouldn't have to navigate a maze to find comfort. One mood, one click, verses that help.

**Privacy by default**  
We keep data collection minimal. This is about you and what you need, not about tracking you.

**Empathetic matching**  
Our verse engine understands that "sad" and "heartbroken" aren't the same thing. Context matters.

**Beautiful, thoughtful design**  
Finding scripture shouldn't feel clinical. The interface is designed to be calming, elegant, and worth returning to.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd moodbible

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Tech Stack

Built with modern web technologies for speed and reliability:

- **React** with TypeScript for type-safe component development
- **Vite** for lightning-fast builds and hot module replacement
- **IndexedDB** for local Bible data storage (works offline once loaded)
- **Progressive Web App** capabilities for installation and offline use

## Contributing

This is a passion project aimed at helping people find comfort and clarity through scripture. If you have ideas for making the matching better, the interface more intuitive, or the experience more helpful, we'd love to hear from you.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with care for the moments when you need it most.
