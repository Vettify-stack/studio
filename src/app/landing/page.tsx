
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Briefcase, Users, Car } from 'lucide-react';
import Logo from '@/components/logo';
import { Badge } from '@/components/ui/badge';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "1. What is Vettify?",
        answer: "Vettify is a compliance and vetting solutions platform designed to ensure drivers, employers, and transport operators meet the requirements of the South African National Road Traffic Act."
    },
    {
        question: "2. Who can use Vettify’s services?",
        answer: "Our platform serves a wide range of users including individual drivers, employers, transport operators (taxi, bus, and trucking companies), recruitment agencies, and even government departments."
    },
    {
        question: "3. What types of checks and verifications does Vettify offer?",
        answer: "We offer comprehensive checks such as PrDP verification, criminal background checks, driver’s license verification, ID/passport validation, AARTO fine tracking, RoadTrac reporting, medicals, credit checks, pre-employment reference checks, and more."
    },
    {
        question: "4. How fast are vetting reports delivered?",
        answer: "Vettify delivers full compliance and vetting reports within 24 hours in most cases."
    },
    {
        question: "5. Is Vettify integrated with national data sources?",
        answer: "Yes, we work with SAPS, RTMC, and other verified third-party providers to ensure the accuracy and integrity of our vetting reports."
    },
    {
        question: "6. Can individual drivers use Vettify?",
        answer: "Absolutely. Vettify offers a self-service dashboard for individuals to manage their compliance, view traffic fines, renew permits, and access exclusive perks."
    },
    {
        question: "7. What features does the individual driver dashboard offer?",
        answer: "Drivers can: View and dispute traffic fines, Track AARTO points, Pay fines directly, Renew PrDP, Access telemedicine consultations, Buy airtime/data and electricity, Receive real-time expiry alerts, Access exclusive retailer discounts."
    },
    {
        question: "8. How does the employer portal differ?",
        answer: "Employers gain access to bulk verification tools, driver compliance dashboards, document storage, reminders, and tools to manage driver subscriptions and HR compliance responsibilities."
    },
    {
        question: "9. What is the pricing model for Vettify?",
        answer: "Vettify uses a tier-based pricing model per user (driver) and employer. In many cases, the employer sponsors driver subscriptions and recovers it through payroll deductions."
    },
    {
        question: "10. Is Vettify POPIA compliant?",
        answer: "Yes. Vettify fully complies with the Protection of Personal Information Act, ensuring data privacy and secure document storage."
    },
    {
        question: "11. Can I renew my PrDP or driver’s license via the app?",
        answer: "Yes, drivers can renew their PrDP, monitor license status, and schedule renewals directly from their Vettify dashboard."
    },
    {
        question: "12. Are there in-app perks or discounts for users?",
        answer: "Yes. Active subscribers can access exclusive discounts on groceries, fuel, health plans, and retail via instant coupon codes.(Coming Soon)"
    },
    {
        question: "13. Can I see proof of paid fines in case I get stopped?",
        answer: "Yes. All paid fines are logged in your dashboard, so you always have proof of payment readily available."
    },
    {
        question: "14. Can the platform notify me about upcoming document expirations?",
        answer: "Definitely. You’ll receive timely reminders about expiring documents such as PDPs, licenses, and medicals."
    },
    {
        question: "15. Does Vettify support pre-employment vetting for companies?",
        answer: "Yes. Employers can run background, reference, and qualification checks as part of their pre-employment process."
    },
    {
        question: "16. Is the platform mobile-friendly?",
        answer: "Vettify is accessible via desktop and mobile web, with an optimized interface for smartphones and tablets."
    },
    {
        question: "17. Can I integrate Vettify into my company’s HR or compliance system?",
        answer: "While Vettify is currently a standalone system, we offer API access for future enterprise integration."
    },
    {
        question: "18. How do I sign up my entire fleet or workforce?",
        answer: "Contact our sales team for bulk onboarding support and tailored packages for employers and fleet operators."
    },
    {
        question: "19. What happens if a user misses a payment or their subscription lapses?",
        answer: "Certain features and access to discounts will be paused until the subscription is reactivated. Compliance alerts and vetting access will also be limited."
    },
    {
        question: "20. Who is Vettify part of?",
        answer: "Vettify is a fully independent vetting and compliance platform, but can integrate with other systems where applicable."
    }
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


export default function LandingPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                           <Link href="/login">Log In</Link>
                        </Button>
                         <Button asChild>
                           <Link href="/register">Sign Up Free</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-16 sm:py-24 text-center">
                <Badge variant="outline" className="mb-4">
                    <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                    Your Partner in Compliance & Vetting
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
                    Streamline Compliance, <br />
                    <span className="text-primary">Unlock Operational Excellence.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                   Vettify offers real-time compliance, behavioural intelligence, and operational insights for the taxi and commercial transport industry.
                </p>
                <div className="flex justify-center items-center gap-4">
                     <Button size="lg" asChild>
                       <Link href="/welcome">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                       <Link href="/login">Request a Demo</Link>
                    </Button>
                </div>
            </main>

             {/* Features Section */}
            <section id="features" className="bg-muted py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold">A Comprehensive Compliance Platform</h2>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                            From driver vetting to fleet management, Vettify provides the tools you need to stay ahead.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                         <FeatureCard 
                            icon={<Users className="w-6 h-6" />}
                            title="Owner Compliance Dashboard"
                            description="An intuitive dashboard for individual vehicle owners to monitor key compliance metrics and vehicle status."
                         />
                         <FeatureCard 
                            icon={<Briefcase className="w-6 h-6" />}
                            title="Owner Driver's dashboard"
                            description="A dedicated dashboard for drivers to manage their compliance, documents, and access telemedicine services."
                         />
                          <FeatureCard 
                            icon={<Car className="w-6 h-6" />}
                            title="Fleet Compliance Management"
                            description="Proactively manage your fleet with alerts for expiring documents and compliance violations."
                         />
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section id="faq" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                         <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-background border-t">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                   <div className="flex items-center gap-2">
                     <Logo />
                   </div>
                    <p className="text-muted-foreground mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} Vettify. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
