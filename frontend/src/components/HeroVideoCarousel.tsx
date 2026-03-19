import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-beauty-treatment-of-a-woman-in-a-spa-3184-large.mp4", // Placeholder stock video
        mainLine: "EVERY SKIN IS DIFFERENT.",
        secondaryLine: "Solutions based on your skin’s needs.",
        smallLine: "No fixed routines. No one-size-fits-all treatments.",
        accent: "Personalized Skincare",
    },
    {
        type: "image",
        url: "/images/salon_banner_1.png",
        mainLine: "EVERY SKIN IS DIFFERENT.",
        secondaryLine: "Experience the ultimate salon atmosphere.",
        smallLine: "Curated environments for your relaxation.",
        accent: "Premium Comfort",
    }
];

const HeroVideoCarousel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const video = document.querySelector('video');
        if (video) {
            video.muted = true;
            video.play().catch(error => {
                console.error("Autoplay was prevented:", error);
            });
        }
    }, []);

    return (
        <section className="relative w-full h-[700px] md:h-[600px] lg:h-[690px] overflow-hidden bg-[#FAF9F6]">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/salon_banner_1.png"
                        className="w-full h-full object-cover scale-105 brightness-[1.05] contrast-[1.0]"
                    >
                        <source
                            src="https://assets.mixkit.co/videos/preview/mixkit-beauty-treatment-of-a-woman-in-a-spa-3184-large.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Professional Overlay System - Uniform Dimming */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="container relative h-full flex items-center justify-center px-6 lg:px-12 mx-auto z-10">
                <div className="max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="space-y-8"
                    >
                        {/* Typography Block */}
                        <div className="space-y-4">
                            <motion.h1
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter  "
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                EVERY SKIN IS<br />DIFFERENT.
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-2xl text-white/95 font-bold tracking-tight italic"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Solutions based on your skin’s needs.
                            </motion.p>
                        </div>

                        {/* CTAs */}
                        <motion.div
                            className="flex justify-center pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Button
                                onClick={() => navigate('/salons')}
                                className="h-16 px-12 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
                            >
                                BOOK A RITUAL
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            {/* <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white/80 to-transparent" />
            </motion.div> */}
        </section>
    );
};

export default HeroVideoCarousel;
