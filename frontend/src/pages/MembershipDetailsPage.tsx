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
            <section className="relative h-[92vh] min-h-[500px] flex items-center justify-center overflow-hidden">
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
                                <span className="text-[10px] font-black text-[#55402f] uppercase tracking-[0.5em] block">Automatic Enrolment</span>
                                <h2 className="text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-[1.1]">
                                    Spend RM600<br />Get Invited.
                                </h2>
                                <div className="h-1.5 w-16 bg-[#55402f] rounded-full" />
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed italic text-lg max-w-lg">
                                Any single visit with a total spend of RM600 or more will automatically grant you prestige membership for a full year.
                            </p>
                            <div className="pt-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="w-5 h-5 text-[#55402f]" />
                                    <span className="text-sm font-bold text-slate-700">Digital Status Activation</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-[#55402f]" />
                                    <span className="text-sm font-bold text-slate-700">One-Year Locked Benefits</span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="perspective-1000"
                        >
                            <motion.div
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{ rotateX, rotateY }}
                                className="relative text-white w-full aspect-[1.5/1] rounded-[2.5rem] bg-[#0A0A0A] overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] group"
                            >
                                {/* Subtle Dynamic Highlight (Top Right Glow) */}
                                <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/[0.12] blur-[100px] rounded-full pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-transparent to-white/[0.05] pointer-events-none" />

                                <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-between">
                                    {/* Top Row: Brand & Crown */}
                                    <div className="flex justify-between items-start">
                                        <div className="text-2xl md:text-3xl font-medium tracking-wide italic font-['DM_Serif_Display']">
                                            Noam Skin.
                                        </div>
                                        <Crown className="w-8 h-8 text-white/90" strokeWidth={1.5} />
                                    </div>

                                    {/* Middle Row: MEMBER & Subtext */}
                                    <div className="flex flex-col mt-auto mb-10">
                                        <h3 className="text-[3.5rem] md:text-[5rem] font-black text-white tracking-tight leading-none mb-4">
                                            MEMBER
                                        </h3>
                                        <div className="space-y-1.5">
                                            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
                                                Exclusive Membership Access
                                            </p>
                                            <p className="text-base md:text-lg text-white/60 font-normal">
                                                Premium skincare rewards & perks
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Row: Button & Sparkles */}
                                    <div className="flex justify-between items-end">
                                        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-white/10 text-white px-8 py-3.5 rounded-xl text-lg font-medium transition-colors shadow-lg">
                                            Become a Member
                                        </button>
                                        <Sparkles className="w-7 h-7 text-white/90" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Billing & Minimum Commitment Details (Reference-Aligned) */}
            <section className="py-24 bg-[#FAF8F6]">
                <div className="container mx-auto px-6 space-y-32">

                    {/* Billing Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                                alt="Buccal Facial Massage Service"
                                className="w-full aspect-[4/5] object-cover rounded-[2.5rem] shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter">Billing</h2>
                            <div className="space-y-6 text-slate-500 font-medium leading-[1.8]">
                                <p>
                                    Your membership fee will be automatically billed to the card on file each month on the date of your enrollment. Appointments can be scheduled at your convenience, and your membership discount will be automatically applied at checkout. Please note that gratuities are not included in the membership.
                                </p>
                                <p>
                                    If a payment is declined, we will reach out to update your payment details. Failure to respond within 30 days will result in membership cancellation, and any unused facials will be forfeited. Membership fees are non-refundable.
                                </p>
                                <p>
                                    By agreeing to this membership, you authorize Daily Habits Wellness Club to charge your card for the monthly membership fee. Should there be a change in the membership fee, you will be notified via email at least 30 days before the new rate is implemented.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Minimum Commitment Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="order-2 lg:order-1 space-y-8 text-left"
                        >
                            <h2 className="text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter">Minimum Commitment</h2>
                            <div className="space-y-6 text-slate-500 font-medium leading-[1.8]">
                                <p>
                                    Membership begins with a minimum commitment of three months to fully experience the benefits of our services. Following this period, membership transitions to a month-to-month basis and can be canceled at any time without penalty.
                                </p>
                                <p>
                                    Please note that cancellations cannot be processed verbally or over the phone. To cancel your membership, email us at info@dailyhabitsmia.com at least seven days prior to your next billing cycle. Upon cancellation, any unused services will be forfeited.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80"
                                alt="Minimum Commitment"
                                className="w-full aspect-[4/3] object-cover rounded-[2.5rem] shadow-2xl"
                            />
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
