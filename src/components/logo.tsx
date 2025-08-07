
import { ShieldHalf } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const Logo = ({ className, inSidebar = false }: { className?: string; inSidebar?: boolean}) => {
    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <ShieldHalf className={cn("w-8 h-8", inSidebar ? 'text-sidebar-foreground' : 'text-primary')} />
            <div className="flex flex-col">
                <h2 className={cn("text-lg font-semibold tracking-tight", inSidebar ? 'text-sidebar-foreground' : 'text-primary')}>
                    Vettify
                </h2>
                {!inSidebar && <p className="text-xs text-muted-foreground">MCI Platform</p>}
            </div>
        </Link>
    )
}

export default Logo;
