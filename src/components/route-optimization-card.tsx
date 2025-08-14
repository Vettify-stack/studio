
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Zap, CloudSun, TrafficCone, Recalculate, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import Image from 'next/image';

const mapPlaceholder = "https://placehold.co/400x200.png";

export default function RouteOptimizationCard() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<null | object>(null);

    const handleCalculate = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResult({
            eta: '4h 15m',
            toll: 'R 75.50',
            fuel: '85 L',
        });
        setIsLoading(false);
    }

  return (
    <Card className="bg-teal-50 border-teal-200 text-teal-900 transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-md">
                <Map className="h-6 w-6 text-teal-700" />
            </div>
            <div>
                <CardTitle className="text-teal-900">AI Route Optimization</CardTitle>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label>Start</Label>
                <Input defaultValue="JHB Mine" />
            </div>
             <div className="space-y-1">
                <Label>End</Label>
                <Input defaultValue="Richards Bay Port" />
            </div>
        </div>
         <div className="space-y-2">
            <Label>Constraints</Label>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="avoid_tolls" />
                    <Label htmlFor="avoid_tolls" className="text-sm font-normal">Avoid Tolls</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="avoid_unrest" />
                    <Label htmlFor="avoid_unrest" className="text-sm font-normal">Avoid Unrest</Label>
                </div>
            </div>
        </div>

        {result ? (
            <div className="space-y-4 pt-4 border-t border-teal-200">
                <div className="flex items-center gap-2">
                     <h4 className="font-semibold text-sm text-teal-800">Live Factors:</h4>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800"><CloudSun className="mr-1 h-3 w-3" /> Clear</Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><TrafficCone className="mr-1 h-3 w-3" /> Med Traffic</Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-teal-100 rounded">
                        <p className="font-bold text-teal-800 text-lg">4h 15m</p>
                        <p className="text-teal-700">ETA</p>
                    </div>
                    <div className="p-2 bg-teal-100 rounded">
                        <p className="font-bold text-teal-800 text-lg">R 75.50</p>
                        <p className="text-teal-700">Toll Cost</p>
                    </div>
                    <div className="p-2 bg-teal-100 rounded">
                        <p className="font-bold text-teal-800 text-lg">85 L</p>
                        <p className="text-teal-700">Fuel Est.</p>
                    </div>
                </div>
                
                 <div className="relative h-24 w-full overflow-hidden rounded-lg border bg-muted">
                    <Image src={mapPlaceholder} alt="Map placeholder" layout="fill" objectFit="cover" data-ai-hint="route map" />
                 </div>
            </div>
        ) :  <div className="h-48 flex items-center justify-center text-sm text-teal-700/80">
                Enter details to calculate route.
             </div>
        }
      </CardContent>
      <CardFooter className="pt-6 grid grid-cols-2 gap-2">
         <Button onClick={handleCalculate} disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            <Recalculate className="mr-2 h-4 w-4" />
            {isLoading ? 'Calculating...' : 'Recalculate'}
        </Button>
        <Button variant="outline" className="w-full" disabled={!result}>
            <Send className="mr-2 h-4 w-4" />
            Send to Driver
        </Button>
      </CardFooter>
    </Card>
  );
}
