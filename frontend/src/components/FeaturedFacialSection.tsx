import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const FeaturedFacialSection = () => {
    const navigate = useNavigate();

    const services = [
        { name: "BUCCAL MASSAGE", link: "/salons?search=Buccal" },
        { name: "FACIALS", link: "/salons?category=Facials" },
        { name: "SKIN CONSULT", link: "/salons?category=Consultation" },
    ];

    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:min-h-[750px] overflow-hidden">
            {/* Left Side: Image (Full width of half) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative h-[450px] md:h-full w-full"
            >
                <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                    alt="Salon Facial Treatment"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Right Side: Grey Block (Full width of half, but content containerized) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center"
            >
                {/* Content Wrapper - Aligns text with the right half of a 1400px container */}
                <div className="w-full max-w-[700px] px-8 py-20 md:px-16 lg:px-24">
                    <div className="space-y-6 max-w-md">
                        <div className="space-y-6">
                            <span className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-[0.2em]">
                                BEST SELLER
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1A2338] tracking-tight leading-[1.05] uppercase">
                                MIAMI'S #1  BUCCAL FACIAL <br /> MASSAGE
                            </h2>
                        </div>

                        <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                            A best-seller and favorite facial among many skincare lovers.
                            The Buccal Facial Massages allows you to fully target the lower
                            muscles of the face.
                        </p>

                        <div className="pt-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button
                                        className="relative text-[10px] md:text-xs font-black uppercase tracking-[0.3em] group text-slate-900 hover:text-black transition-all flex flex-col items-start"
                                    >
                                        BOOK NOW
                                        <span className="w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full mt-1" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full sm:max-w-md border-r-0 p-12 flex flex-col gap-12">
                                    <SheetHeader className="text-left space-y-8">
                                        <div className="flex flex-col">
                                            <span className="text-3xl font-serif text-[#4A3728] leading-tight">Noam</span>
                                            <span className="text-3xl font-serif text-[#4A3728] italic leading-tight ml-2">Skin.</span>
                                        </div>
                                        <SheetTitle className="text-xl font-bold text-slate-900 tracking-tight">
                                            Select a service:
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="flex flex-col gap-8 mt-4">
                                        {services.map((service) => (
                                            <button
                                                key={service.name}
                                                onClick={() => navigate(service.link)}
                                                className="flex items-center justify-between w-full group py-2 text-left"
                                            >
                                                <span className="text-lg font-black tracking-widest text-[#1A2338] group-hover:text-accent transition-colors">
                                                    {service.name}
                                                </span>
                                                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-accent transition-all group-hover:translate-x-1" />
                                            </button>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedFacialSection;
