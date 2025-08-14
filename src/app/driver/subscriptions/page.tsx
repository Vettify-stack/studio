
import { PricingCard, type Plan } from '@/components/pricing-card';

const plans: Plan[] = [
  {
    name: 'Silver',
    price: 99,
    priceYearly: 999,
    yearlySave: 189,
    description: 'Essential features for individual driver compliance.',
    features: [
      { text: 'Driver Profile Setup (ID, License, PDP, Certificate Uploads)', included: true },
      { text: 'Document Expiry Reminders', included: true },
      { text: 'CV Upload (Upload only)', included: true },
      { text: 'Fines Management (View Only)', included: true },
      { text: 'Doctor Consultation Booking (Basic Access)', included: true },
      { text: 'Job Board Access (View Only)', included: true },
      { text: 'Two-Way Communication (SMS/WhatsApp)', included: false },
      { text: 'AARTO Demerit Check', included: false },
      { text: 'Vetting Document Priority Processing', included: false },
      { text: 'Biometric/Photo Verification', included: false },
      { text: 'Compliance Dashboard', included: false },
      { text: 'AI Driver Trainer', included: false },
      { text: 'Driver Rating Tracker (Private View)', included: true },
      { text: 'Digital Verified Driver ID (QR Code)', included: false },
      { text: 'Driver Availability Status', included: false },
      { text: 'License/PrDP Booking Assistance', included: false },
      { text: 'Vehicle Maintenance Reminders', included: false },
      { text: 'Newsletter & Monthly Job Tips', included: false },
      { text: 'Live Webinars / Workshops', included: false },
      { text: 'Exclusive Job Invitations / Early Access', included: false },
      { text: 'Partner Discounts & Perks', included: false },
      { text: 'Support (Email Support)', included: true },
    ],
    tier: 'silver',
  },
  {
    name: 'Gold',
    price: 149,
    priceYearly: 1500,
    yearlySave: 288,
    description: 'Advanced tools for the proactive professional driver.',
    features: [
      { text: 'Driver Profile Setup (ID, License, PDP, Certificate Uploads)', included: true },
      { text: 'Document Expiry Reminders', included: true },
      { text: 'CV Upload (with templates)', included: true },
      { text: 'Fines Management (Pay & Dispute Fines)', included: true },
      { text: 'Doctor Consultation Booking', included: true },
      { text: 'Job Board Access (View & Apply)', included: true },
      { text: 'Two-Way Communication (SMS/WhatsApp)', included: true },
      { text: 'AARTO Demerit Check', included: true },
      { text: 'Vetting Document Priority Processing', included: true },
      { text: 'Biometric/Photo Verification', included: false },
      { text: 'Compliance Dashboard', included: false },
      { text: 'AI Driver Trainer', included: false },
      { text: 'Driver Rating Tracker', included: true },
      { text: 'Digital Verified Driver ID (QR Code)', included: false },
      { text: 'Driver Availability Status', included: true },
      { text: 'License/PrDP Booking Assistance', included: false },
      { text: 'Vehicle Maintenance Reminders', included: true },
      { text: 'Newsletter & Monthly Job Tips', included: true },
      { text: 'Live Webinars / Workshops', included: false },
      { text: 'Exclusive Job Invitations / Early Access', included: false },
      { text: 'Partner Discounts & Perks', included: true },
      { text: 'Support (Chat Support)', included: true },
    ],
    tier: 'gold',
  },
  {
    name: 'Platinum',
    price: 199,
    priceYearly: 2000,
    yearlySave: 388,
    description: 'The ultimate suite for career growth and maximum compliance.',
    features: [
      { text: 'Driver Profile Setup (ID, License, PDP, Certificate Uploads)', included: true },
      { text: 'Document Expiry Reminders', included: true },
      { text: 'CV Upload (store multiple versions)', included: true },
      { text: 'Fines Management (Pay & Dispute Fines)', included: true },
      { text: 'Doctor Consultation Booking (via approved network)', included: true },
      { text: 'Job Board Access (Apply + Matched Job Alerts)', included: true },
      { text: 'Two-Way Communication (SMS/WhatsApp + Sick Notes Auto-Forward)', included: true },
      { text: 'AARTO Demerit Check', included: true },
      { text: 'Vetting Document Priority Processing', included: true },
      { text: 'Biometric/Photo Verification', included: true },
      { text: 'Compliance Dashboard (Detailed + Monthly Report)', included: true },
      { text: 'AI Driver Trainer (Suggestions Only)', included: true },
      { text: 'Driver Rating Tracker', included: true },
      { text: 'Digital Verified Driver ID (QR Code)', included: true },
      { text: 'Driver Availability Status', included: true },
      { text: 'License/PrDP Booking Assistance', included: true },
      { text: 'Vehicle Maintenance Reminders', included: true },
      { text: 'Newsletter & Monthly Job Tips', included: true },
      { text: 'Live Webinars / Workshops (1/month)', included: true },
      { text: 'Exclusive Job Invitations / Early Access', included: true },
      { text: 'Partner Discounts & Perks', included: true },
      { text: 'Support (Priority Support + Dedicated Assistant)', included: true },
    ],
    tier: 'platinum',
  },
];

export default function SubscriptionPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Choose the Plan That's Right for You
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock more features and benefits by upgrading your plan. All plans can be cancelled anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
