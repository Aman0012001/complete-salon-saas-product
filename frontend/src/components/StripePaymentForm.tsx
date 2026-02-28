import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Loader2, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

// Stripe publishable key
const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
);

// Card element styling
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            color: '#1A1A1A',
            '::placeholder': { color: '#9CA3AF' },
            iconColor: '#6B7280',
        },
        invalid: {
            color: '#EF4444',
            iconColor: '#EF4444',
        },
    },
    hidePostalCode: true,
};

// ────────────────────────────────────────────────────────────
// Inner form (must be inside <Elements>)
// ────────────────────────────────────────────────────────────
interface InnerFormProps {
    amount: number;          // in MYR (e.g. 120.50)
    currency?: string;       // default 'myr'
    type: 'order' | 'booking' | 'subscription';
    referenceId?: string;    // order / booking id to update after payment
    buttonLabel?: string;
    onSuccess: (paymentIntentId: string) => void;
    onError?: (message: string) => void;
}

function StripeCardForm({
    amount,
    currency = 'myr',
    type,
    referenceId,
    buttonLabel = 'Pay now',
    onSuccess,
    onError,
}: InnerFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();

    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        setProcessing(true);
        setCardError(null);

        try {
            // 1. Create PaymentIntent on our backend
            const intentData: any = await api.stripe.createPaymentIntent({
                amount,
                currency,
                metadata: { type, reference_id: referenceId ?? '' },
            });

            if (!intentData?.client_secret) {
                throw new Error('Failed to initialise payment. Please try again.');
            }

            // 2. Confirm card payment with Stripe.js
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                intentData.client_secret,
                { payment_method: { card: cardElement } }
            );

            if (stripeError) {
                setCardError(stripeError.message ?? 'Payment failed. Please try again.');
                onError?.(stripeError.message ?? '');
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                // 3. Notify our backend to finalise the record
                if (referenceId) {
                    await api.stripe.confirmPayment({
                        payment_intent_id: paymentIntent.id,
                        type,
                        reference_id: referenceId,
                    });
                }

                toast({ title: 'Payment Successful!', description: `MYR ${amount.toFixed(2)} charged successfully.` });
                onSuccess(paymentIntent.id);
            }
        } catch (err: any) {
            const msg = err.message || 'An unexpected error occurred.';
            setCardError(msg);
            onError?.(msg);
            toast({ title: 'Payment Failed', description: msg, variant: 'destructive' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Input */}
            <div className="relative">
                <div className="border border-slate-200 rounded-lg bg-white/70 px-4 py-4 focus-within:border-[#1A1A1A] transition-all">
                    <CardElement options={CARD_ELEMENT_OPTIONS} onChange={() => setCardError(null)} />
                </div>
                {cardError && (
                    <p className="text-sm text-red-500 font-medium mt-2 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5" />
                        {cardError}
                    </p>
                )}
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Lock className="w-3 h-3" />
                Payments are secured and encrypted by Stripe
            </div>

            {/* Submit button */}
            <Button
                type="submit"
                disabled={!stripe || processing}
                className="w-full h-16 bg-[#1A1A1A] hover:bg-black text-white rounded-lg text-lg font-bold transition-all"
            >
                {processing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        {buttonLabel} — MYR {amount.toFixed(2)}
                    </>
                )}
            </Button>
        </form>
    );
}

// ────────────────────────────────────────────────────────────
// Public wrapper — provides the <Elements> context
// ────────────────────────────────────────────────────────────
export interface StripePaymentFormProps extends InnerFormProps { }

export default function StripePaymentForm(props: StripePaymentFormProps) {
    return (
        <Elements stripe={stripePromise}>
            <StripeCardForm {...props} />
        </Elements>
    );
}
