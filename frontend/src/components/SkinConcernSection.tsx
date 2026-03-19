import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const concerns = [
    {
        title: "Acne / Breakouts",
        recommendation: "Advanced Custom Skin Therapy",
    },
    {
        title: "Sensitive / Damaged Barrier",
        recommendation: "Skin Barrier Repair Therapy",
    },
    {
        title: "Pigmentation / Uneven Tone",
        recommendation: "Pigment Corrective Therapy",
    },
    {
        title: "Dull / Dehydrated Skin",
        recommendation: "Essential Custom Facial",
    },
    {
        title: "Fine Lines & Signs of Aging",
        recommendation: "Regeneration Facial",
    },
];

const SkinConcernSection = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full py-20 bg-white">
            <div className="mx-auto px-4 md:px-20">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400">
                        Skin Concerns & Solutions
                    </span>

                    <h2 className="text-3xl md:text-5xl font-medium text-[#1A2338]">
                        What's Your Main Skin Concern?
                    </h2>

                    <p className="text-sm text-slate-400 max-w-xl mx-auto">
                        Select your concern to view the recommended treatment.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {concerns.map((concern, index) => (
                        <motion.div
                            key={concern.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => navigate(`/salons?search=${encodeURIComponent(concern.recommendation)}`)}

                            className="bg-[#F5F2ED] rounded-[1rem] p-6 h-full flex flex-col justify-between border border-transparent hover:border-[#e5e2dc] transition-all cursor-pointer"
                        >
                            {/* Top Content */}
                            <div className="space-y-5">

                                {/* Icon */}
                                <div className="w-12 h-12 bg-[#B07D62] rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-medium text-[#1A2338] leading-snug">
                                    {concern.title}
                                </h3>

                                {/* Recommendation */}
                                <div className="space-y-1">
                                    <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400">
                                        Recommended Treatment
                                    </span>

                                    <p className="text-sm text-[#4A5568]">
                                        {concern.recommendation}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Button (FIXED POSITION) */}
                            <div className="pt-6">
                                <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#1A2338]">
                                    Book This Treatment
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default SkinConcernSection;
