"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Server, Smartphone, Globe, Cpu, Layers, Zap, RotateCcw, Trophy } from "lucide-react";

// Game icons mapping to skills
const icons = [
    { id: 1, icon: <Code className="w-8 h-8" />, name: "React" },
    { id: 2, icon: <Database className="w-8 h-8" />, name: "SQL" },
    { id: 3, icon: <Server className="w-8 h-8" />, name: "Node.js" },
    { id: 4, icon: <Smartphone className="w-8 h-8" />, name: "Mobile" },
    { id: 5, icon: <Globe className="w-8 h-8" />, name: "Web" },
    { id: 6, icon: <Cpu className="w-8 h-8" />, name: "API" },
    { id: 7, icon: <Layers className="w-8 h-8" />, name: "Design" },
    { id: 8, icon: <Zap className="w-8 h-8" />, name: "Creative" },
];

interface Card {
    id: number;
    iconId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

export default function Game() {
    const [cards, setCards] = useState<Card[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [firstChoice, setFirstChoice] = useState<Card | null>(null);
    const [secondChoice, setSecondChoice] = useState<Card | null>(null);
    const [gameWon, setGameWon] = useState(false);

    // Initialize game
    const shuffleCards = () => {
        const shuffledIcons = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
                id: index,
                iconId: card.id,
                isFlipped: false,
                isMatched: false,
            }));

        setFirstChoice(null);
        setSecondChoice(null);
        setCards(shuffledIcons);
        setMoves(0);
        setMatches(0);
        setGameWon(false);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    // Handle card choice
    const handleChoice = (card: Card) => {
        if (!disabled && !card.isFlipped) { // Prevent clicking flipped cards
            firstChoice ? setSecondChoice(card) : setFirstChoice(card);

            // Flip the card visually
            setCards(prev => prev.map(c =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            ));
        }
    };

    // Compare 2 selected cards
    useEffect(() => {
        if (firstChoice && secondChoice) {
            setDisabled(true);
            if (firstChoice.iconId === secondChoice.iconId) {
                setCards((prev) => {
                    return prev.map((card) => {
                        if (card.iconId === firstChoice.iconId) {
                            return { ...card, isMatched: true };
                        }
                        return card;
                    });
                });
                setMatches((prev) => prev + 1);
                resetTurn();
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        (c.id === firstChoice.id || c.id === secondChoice.id)
                            ? { ...c, isFlipped: false }
                            : c
                    ));
                    resetTurn();
                }, 1000);
            }
            setMoves((prev) => prev + 1);
        }
    }, [firstChoice, secondChoice]);

    // Check for win
    useEffect(() => {
        if (matches === icons.length && matches > 0) {
            setGameWon(true);
        }
    }, [matches]);

    const resetTurn = () => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
    };

    return (
        <section id="game" className="py-24 bg-card/20 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Tech Stack <span className="text-primary">Memory Match</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Take a break! Match the skill icons to test your memory.
                    </p>

                    <div className="flex justify-center items-center gap-8 text-lg font-medium">
                        <div className="bg-background px-4 py-2 rounded-full border border-border">
                            Moves: <span className="text-primary">{moves}</span>
                        </div>
                        <button
                            onClick={shuffleCards}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto relative">
                    {/* Victory Overlay */}
                    <AnimatePresence>
                        {gameWon && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl"
                            >
                                <Trophy className="w-24 h-24 text-yellow-400 mb-4 animate-bounce" />
                                <h3 className="text-4xl font-bold text-white mb-2">You Won!</h3>
                                <p className="text-xl text-gray-300 mb-6">Completed in {moves} moves</p>
                                <button
                                    onClick={shuffleCards}
                                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform"
                                >
                                    Play Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Card Grid */}
                    <div className="grid grid-cols-4 gap-3 md:gap-4 aspect-square max-w-md mx-auto">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="relative cursor-pointer group"
                                onClick={() => handleChoice(card)}
                            >
                                <motion.div
                                    className="w-full h-full aspect-square"
                                    initial={false}
                                    animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Front of card (Hidden state - Show Logo or Pattern) */}
                                    <div className="absolute inset-0 bg-secondary border-2 border-border rounded-xl flex items-center justify-center backface-hidden z-10 hover:border-primary/50 transition-colors">
                                        <div className="w-3 h-3 bg-primary/20 rounded-full" />
                                    </div>

                                    {/* Back of card (Revealed state - Show Icon) */}
                                    <div
                                        className={`absolute inset-0 bg-background border-2 ${card.isMatched ? "border-primary bg-primary/10" : "border-primary"} rounded-xl flex items-center justify-center backface-hidden`}
                                        style={{ transform: "rotateY(180deg)" }}
                                    >
                                        <div className="text-primary">
                                            {icons.find(i => i.id === card.iconId)?.icon}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
