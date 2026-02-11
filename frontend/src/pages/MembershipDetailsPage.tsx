import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Star,
    Gift,
    Wallet,
    Percent,
    ShieldCheck,
    Clock,
    ArrowRight,
    Sparkles,
    Coins,
    Gem,
    Calendar,
    ChevronRight,
    Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const MembershipDetailsPage = () => {
    const navigate = useNavigate();

    // Membership Card Tilt Animation Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const benefits = [
        {
            icon: Percent,
            title: "10% Pure Discount",
            description: "Benefit from a flat 10% discount on all our signature treatments and rituals.",
            bgColor: "bg-[#E0F3F0]", // Mint
            iconColor: "text-[#10B981]"
        },
        {
            icon: Coins,
            title: "Double Point System",
            description: "Earn points with every RM1 spent and redeem them for future glow sessions.",
            bgColor: "bg-[#F3F4F6]", // Slate
            iconColor: "text-[#1A1A1A]"
        },
        {
            icon: Calendar,
            title: "Annual Validity",
            description: "Your prestige status remains active for one full year from the day of activation.",
            bgColor: "bg-[#EEF2FF]", // Lavender
            iconColor: "text-[#6366F1]"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Reference-Aligned Hero Section */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                        alt="Minimalist Luxurious Spa"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="container mx-auto px-6 relative text-center z-10">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-8 py-2.5 rounded-full bg-[#1A1A1A] border border-white/10"
                        >
                            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.4em]">Exclusive Experience</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase font-['DM_Serif_Display'] leading-[1.1]">
                                Become Our Member
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80">
                                Become part of our family and enjoy exclusive rewards, priority bookings, and master-level benefits.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3-Column Benefits Section (Reference-Aligned) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center space-y-6"
                            >
                                <div className={`w-14 h-14 rounded-full ${benefit.bgColor} flex items-center justify-center ${benefit.iconColor}`}>
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">{benefit.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[260px] mx-auto">
                                        {benefit.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prestige Card Secondary Section (Added Depth) */}
            <section className="py-32 bg-[#FDFCFB] border-t border-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black text-[#b07d62] uppercase tracking-[0.5em] block">Automatic Enrolment</span>
                                <h2 className="text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-[1.1]">
                                    Spend RM600<br />Get Invited.
                                </h2>
                                <div className="h-1.5 w-16 bg-[#b07d62] rounded-full" />
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed italic text-lg max-w-lg">
                                Any single visit with a total spend of RM600 or more will automatically grant you prestige membership for a full year.
                            </p>
                            <div className="pt-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="w-5 h-5 text-[#b07d62]" />
                                    <span className="text-sm font-bold text-slate-700">Digital Status Activation</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-[#b07d62]" />
                                    <span className="text-sm font-bold text-slate-700">One-Year Locked Benefits</span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="perspective-1000"
                        >
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{ rotateX, rotateY }}
                                className="relative w-full aspect-[1.6/1] rounded-[2.5rem] bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#2a2a2a] overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert opacity-40 shrink-0" />
                                        <Crown className="w-8 h-8 text-[#b07d62]" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-white tracking-widest uppercase">Member</h3>
                                        <div className="flex justify-between items-center opacity-40">
                                            <p className="text-[10px] uppercase font-mono tracking-widest">Prestige Signature</p>
                                            <Sparkles className="w-4 h-4 text-[#b07d62]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Activation CTA */}
            <section className="py-32 bg-white text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] uppercase tracking-tighter">Ready for the rewards?</h2>
                        <p className="text-slate-400 font-medium italic mb-12">Your master-level benefits are just one ritual away.</p>
                        <Button
                            onClick={() => navigate("/signup")}
                            className="h-20 px-16 bg-[#1A1A1A] hover:bg-black text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all hover:scale-105"
                        >
                            Start Your Membership
                        </Button>
                        <div className="pt-12 flex items-center justify-center gap-12 opacity-30 grayscale grayscale-100">
                            <span className="text-[10px] font-black uppercase tracking-widest">Verified Members</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Global Rewards</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Secure Registry</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MembershipDetailsPage;
