import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import WaitlistDialog from "./WaitlistDialog";
import { ApprovedBadge } from "./ApprovedBadge";
import api from "@/services/api";
import { getImageUrl } from "@/utils/imageUrl";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
const InsideSpaceSection = () => {
    const navigate = useNavigate();
    const [waitlistOpen, setWaitlistOpen] = useState(false);
    const [selectedService, setSelectedService] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await api.services.getCategories();
                if (data && data.length > 0) {
                    setCategories(data);
                } else {
                    // Fallback to static if none found in DB
                    setCategories([
                        { id: "facials", title: "Facials", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop", isComingSoon: false },
                        { id: "body-therapy", title: "Body Therapy", image: "https://images.unsplash.com/photo-1544161515-4af6b1d46af0?w=800&auto=format&fit=crop", isComingSoon: true, isGrayscale: true },
                        { id: "hair-removal", title: "Hair Removal", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop", isComingSoon: true, isGrayscale: true },
                        { id: "skin-care", title: "Skin Care", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?w=800&auto=format&fit=crop", isComingSoon: false },
                    ]);
                }
            } catch (error) {
                console.error("[InsideSpaceSection] Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleCardClick = (cat: any) => {
        if (cat.isComingSoon) {
            setSelectedService(cat.title);
            setWaitlistOpen(true);
        } else if (cat.link) {
            navigate(cat.link);
        } else {
            navigate(`/salons?category=${encodeURIComponent(cat.title)}`);
        }
    };

    return (
        <section className="py-24 px-4 bg-white overflow-hidden">
            <div className="container mx-auto">
                {/* Header Block */}
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A2338] tracking-tight uppercase">
                            Inside Our Space
                        </h2>
                        <p className="text-base md:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
                            Step into a place designed just for you. Our space is all about personalized care, comfort, and results.
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Area */}
                <div className="relative max-w-[1400px] mx-auto px-4 md:px-12">
                    {loading ? (
                        <div className="h-[450px] flex items-center justify-center">
                            <span className="text-slate-400 font-bold animate-pulse">Loading categories...</span>
                        </div>
                    ) : (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-6">
                                {categories.map((cat, index) => (
                                    <CarouselItem key={cat.id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                        >
                                            <div
                                                onClick={() => handleCardClick(cat)}
                                                className="group cursor-pointer space-y-5"
                                            >
                                                {/* Image Layer with Badge */}
                                                <div className="relative h-[300px] md:h-[350px] rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl active:scale-95 bg-slate-50 border border-slate-100/50">
                                                    <img
                                                        src={getImageUrl(cat.image, 'service', cat.id)}
                                                        alt={cat.title}
                                                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${cat.isGrayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
                                                        style={{ textIndent: "-9999px" }}
                                                    />

                                                    {/* Top Badge (APPROVED) */}
                                                    <div className="absolute top-6 left-6 z-10 transition-transform duration-500 group-hover:scale-105">
                                                        <ApprovedBadge />
                                                    </div>

                                                    {/* Subtle Overlays */}
                                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500" />
                                                </div>

                                                {/* Content Area - CENTERED BELOW CARD */}
                                                <div className="text-center space-y-1 px-2">
                                                    <h3 className="font-black text-xl md:text-2xl text-[#1A2338] uppercase tracking-tight leading-tight group-hover:text-[#b07d62] transition-colors">
                                                        {cat.title}
                                                    </h3>

                                                    <div className="flex items-center justify-center gap-2">
                                                        {cat.isComingSoon ? (
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Coming Soon</span>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 text-[#b07d62]">
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Explore Now</span>
                                                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 items-center">
                                <CarouselPrevious className="relative left-0 translate-y-0 h-12 w-12 rounded-full border-none bg-white shadow-xl hover:bg-slate-50 transition-all" />
                            </div>
                            <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 items-center">
                                <CarouselNext className="relative right-0 translate-y-0 h-12 w-12 rounded-full border-none bg-white shadow-xl hover:bg-slate-50 transition-all" />
                            </div>
                        </Carousel>
                    )}
                </div>
            </div>

            <WaitlistDialog
                isOpen={waitlistOpen}
                onClose={() => setWaitlistOpen(false)}
                serviceName={selectedService}
            />
        </section>
    );
};

export default InsideSpaceSection;
