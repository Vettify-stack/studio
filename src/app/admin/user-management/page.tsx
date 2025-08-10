
'use client';

import { useState } from 'react';
import {
  Users,
  Search,
  RefreshCw,
  MoreVertical,
  Mail,
  CalendarDays,
  Check,
  X,
  Eye,
  LayoutGrid,
  List,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type PlatformUser } from '@/lib/types';
import SafeDate from '@/components/safe-date';
import { useToast } from '@/hooks/use-toast';
import {
    Card,
    CardContent,
    CardFooter,
  } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';


const initialUsers: PlatformUser[] = [
  {
    id: 'user-1',
    name: 'Macdonald Williams',
    role: 'Driver',
    email: 'tashvillen@gmail.com',
    registeredDate: '2025-06-19',
    subscriptionStatus: 'Unpaid',
    profileStatus: 'Pending',
    avatar: {
      src: 'https://placehold.co/100x100.png',
      fallback: 'MW',
    },
  },
  {
    id: 'user-2',
    name: 'Super Admin',
    role: 'Super Admin',
    email: 'mw9078612@gmail.com',
    registeredDate: '2025-06-17',
    subscriptionStatus: 'Unpaid',
    profileStatus: 'Approved',
    avatar: {
      src: 'https://placehold.co/100x100.png',
      fallback: 'SA',
    },
  },
  {
    id: 'user-3',
    name: 'Macdonald Williams',
    role: 'Driver',
    email: 'macdonald@vettify.co.za',
    registeredDate: '2025-06-16',
    subscriptionStatus: 'Unpaid',
    profileStatus: 'Pending',
     avatar: {
      src: 'https://placehold.co/100x100.png',
      fallback: 'MW',
    },
  },
];

const subscriptionStatusConfig = {
    Paid: 'bg-green-100 text-green-800 border-green-200',
    Unpaid: 'bg-red-100 text-red-800 border-red-200',
}

const profileStatusConfig = {
    Approved: 'bg-green-100 text-green-800 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Rejected: 'bg-red-100 text-red-800 border-red-200',
}

function UserCard({ user, onAction }: { user: PlatformUser, onAction: (userId: string, action: 'approve' | 'reject') => void }) {
    const subscriptionColor = subscriptionStatusConfig[user.subscriptionStatus] || 'bg-gray-100 text-gray-800 border-gray-200';
    const profileColor = profileStatusConfig[user.profileStatus] || 'bg-gray-100 text-gray-800 border-gray-200';

    return (
        <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar.src} data-ai-hint="person portrait" />
                            <AvatarFallback style={{backgroundColor: user.avatar.fallback === 'SA' ? '#A855F7' : '#3B82F6', color: 'white'}}>{user.avatar.fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
                 <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>Registered: <SafeDate dateString={user.registeredDate} /></span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span>Subscription:</span> <Badge variant="outline" className={cn(subscriptionColor)}>{user.subscriptionStatus}</Badge>
                    <span>Profile:</span> <Badge variant="outline" className={cn(profileColor)}>{user.profileStatus}</Badge>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                {user.profileStatus === 'Pending' ? (
                     <div className="flex w-full gap-2">
                        <Button variant="outline" className="w-full text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700" onClick={() => onAction(user.id, 'approve')}>
                            <Check className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700" onClick={() => onAction(user.id, 'reject')}>
                            <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                     </div>
                ) : (
                    <Button variant="outline" className="w-full">
                        <Eye className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default function UserManagementPage() {
    const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { toast } = useToast();

    const handleAction = (userId: string, action: 'approve' | 'reject') => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, profileStatus: action === 'approve' ? 'Approved' : 'Rejected' }
                    : user
            )
        );
        toast({
            title: `User ${action === 'approve' ? 'Approved' : 'Rejected'}`,
            description: `The user profile has been updated.`,
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-muted-foreground" />
                    <h2 className="text-2xl font-semibold">User Management</h2>
                    <Badge>{users.length} users</Badge>
                </div>
                <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>

            <div className="p-4 bg-card border rounded-lg flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or company..." className="pl-8 w-full" />
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <Select>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="admin">Super Admin</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="gp">Medical GP</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as any)} >
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                        <LayoutGrid className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view">
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <UserCard key={user.id} user={user} onAction={handleAction} />
                ))}
            </div>
        </div>
    )
}
