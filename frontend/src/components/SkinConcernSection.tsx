import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const concerns = [
    {
        title: "Oily / Breakouts",
        recommendation: "Amber Carboxy Facial",
    },
    {
        title: "Redness / Sensitive",
        recommendation: "Absolute Regeneration",
    },
    {
        title: "Dry / Tired Skin",
        recommendation: "The Smart Hydra Programme",
    },
    {
        title: "Uneven Tone / Acne Scars",
        recommendation: "Amber Cellular Facial",
    },
    {
        title: "Loss of Firmness",
        recommendation: "Orkid Stem Cell Facial",
    },
];

const SkinConcernSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                {/* Header Block */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">
                            SKIN CONCERNS & SIGNATURE SOLUTIONS
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#1A2338] tracking-tight uppercase">
                            WHAT'S YOUR MAIN SKIN CONCERN?
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 font-medium max-w-2xl mx-auto">
                            Select your concern to view the recommended treatment and book your session.
                        </p>
                    </motion.div>
                </div>

                {/* Concerns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {concerns.map((concern, index) => (
                        <motion.div
                            key={concern.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#F5F2ED] rounded-[1rem] p-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 group cursor-pointer border border-transparent hover:border-slate-100"
                            onClick={() => navigate(`/salons?search=${encodeURIComponent(concern.recommendation)}`)}
                        >
                            <div className="space-y-6">
                                {/* Icon Box */}
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-[#B07D62] transition-colors duration-500">
                                    <Sparkles className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" />
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-3xl font-black text-[#1A2338] tracking-tight">
                                        {concern.title}
                                    </h3>

                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            RECOMMENDED TREATMENT:
                                        </span>
                                        <p className="text-[#4A5568] text-lg font-medium">
                                            {concern.recommendation}
                                        </p>
                                    </div>
                                </div>

                                <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1A2338] group-hover:text-[#B07D62] transition-colors duration-500">
                                    VIEW & BOOK <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
