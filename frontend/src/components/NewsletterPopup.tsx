import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Instagram } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const NewsletterPopup = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubscribed, setHasSubscribed] = useState(false);

    useEffect(() => {
        // Only show for guest users
        if (user) return;

        const isDismissed = localStorage.getItem("newsletter_popup_dismissed");
        if (isDismissed) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000); // 5 second delay

        return () => clearTimeout(timer);
    }, [user]);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem("newsletter_popup_dismissed", "true");
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            await api.newsletter.subscribe(email);
            setHasSubscribed(true);
            toast.success("Welcome! Use code SUB50 for 50 RM off your first booking.");
            // Auto close after 3 seconds on success
            setTimeout(() => {
                handleDismiss();
            }, 3000);
        } catch (error: any) {
            toast.error(error.message || "Failed to subscribe. Please try again.");
        } finally {
            setIsLoading(true); // Keep it loading for the success state briefly
            setTimeout(() => setIsLoading(false), 2000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-white rounded-3xl shadow-2xl">
                <div className="flex flex-col md:flex-row h-full min-h-[450px]">
                    {/* Left Side - Image */}
                    <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                        <img
                            src="/images/salon_banner_1.png"
                            alt="Salon Experience"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay for premium look */}
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-12 bg-[#F8F5F2] relative">
                        {!hasSubscribed ? (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900 leading-tight">
                                        Get RM 50 OFF Your First Visit
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Subscribe to our newsletter for exclusive offers, wellness tips, and a premium salon experience.
                                    </p>
                                </div>

                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-12 bg-white border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-black/5"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-black hover:bg-black/90 text-white font-semibold rounded-full tracking-wider uppercase transition-all duration-300"
                                    >
                                        {isLoading ? "Subscribing..." : "GET MY DISCOUNT"}
                                    </Button>
                                </form>

                                <div className="pt-4 flex justify-center">
                                    <Instagram className="w-6 h-6 text-gray-400 hover:text-black cursor-pointer transition-colors" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                    >
                                        <svg
                                            className="w-10 h-10 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Thank You!</h3>
                                <p className="text-gray-600 text-lg">
                                    Use code <span className="font-bold text-black">SUB50</span> at checkout or show this at the salon.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default NewsletterPopup;
