
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, Briefcase, Users, Car } from 'lucide-react';
import Logo from '@/components/logo';

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
                       <Link href="/register">
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
                            title="Association & Fleet Views"
                            description="Powerful overview for taxi associations and fleet managers to track member/employee compliance at a glance."
                         />
                          <FeatureCard 
                            icon={<Car className="w-6 h-6" />}
                            title="Fleet Compliance Management"
                            description="Proactively manage your fleet with alerts for expiring documents and compliance violations."
                         />
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
