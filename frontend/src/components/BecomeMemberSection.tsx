import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BecomeMemberSection = () => {
    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* Text Content - Left Side */}
                <div className="flex items-center p-12 md:p-24 lg:p-32 xl:p-40 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl space-y-8"
                    >
                        {/* Eyebrow - matches reference style */}
                        <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#1A1A1A] uppercase">
                            Exclusive Access
                        </div>

                        {/* Bold Uppercase Header */}
                        <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-black text-[#0f172a] uppercase tracking-tighter leading-[1.05]">
                            BECOME A<br />MEMBER
                        </h2>

                        {/* Subheading */}
                        <p className="text-base text-slate-500 font-medium leading-[1.8] max-w-md">
                            Elevate your self-care ritual. Our memberships are designed for consistent, visible results that fit your lifestyle.
                        </p>

                        {/* Minimal Text CTA matching "BOOK NOW" */}
                        <div className="pt-6">
                            <Link
                                to="/signup"
                                className="text-[10px] md:text-xs font-black text-[#1A1A1A] tracking-[0.3em] uppercase hover:underline underline-offset-8 transition-all"
                            >
                                JOIN A MEMBER
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Full Bleed Image - Right Side */}
                <div className="relative min-h-[500px] lg:min-h-full h-full order-1 lg:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80"
                        alt="Become a Member Experience"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default BecomeMemberSection;
