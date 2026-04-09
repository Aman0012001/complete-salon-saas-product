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
                        // poster="/images/salon_banner_1.png"
                        className="w-full h-full object-cover scale-105  contrast-[1.0]"
                    >
                        <source
                            src="/hero.MOV"
                            // src="/herovideo.MP4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Professional Overlay System - Uniform Dimming */}
                {/* <div className="absolute inset-0 bg-black/40" /> */}
            </div>

            {/* Content Container */}


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
