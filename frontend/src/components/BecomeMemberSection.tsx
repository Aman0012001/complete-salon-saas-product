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
                <div className="flex justify-center lg:justify-end pr-6 md:pr-16 lg:pr-24 order-1 lg:order-2">
                    <div className="w-full max-w-[650px]">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-[2.5rem] overflow-hidden "
                        >
                            <img
                                src="https://i.ibb.co/YFmynKJX/fcce72cd-a4a6-463f-ad06-8e919dc5c3a8.jpg"
                                alt="Become a Member Experience"
                                className="w-full h-[500px] md:h-[650px] object-cover"
                            />
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default BecomeMemberSection;
