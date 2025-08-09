
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Camera, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LivelinessCheckCard() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const stopCameraStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  }, []);
  
  const startCameraStream = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        setIsCameraActive(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsCameraActive(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    } else {
      setHasCameraPermission(false);
      setIsCameraActive(false);
    }
  }, [toast]);

  useEffect(() => {
    startCameraStream();
    return () => {
        stopCameraStream();
    }
  }, [startCameraStream, stopCameraStream]);

  const handleTakeSnapshot = () => {
    stopCameraStream();
    setSnapshotTaken(true);
    toast({
        title: "Snapshot Taken!",
        description: "Your photo has been captured for verification.",
    })
  }

  const handleRetake = () => {
    setSnapshotTaken(false);
    startCameraStream();
  }

  return (
    <Card className="bg-blue-50 border-blue-200 transition-all hover:shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-md">
            <Video className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <CardTitle className="text-blue-900">Identity Verification</CardTitle>
            <CardDescription className="text-blue-700">
              Complete a quick liveliness check to secure your account.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-muted">
          <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                 <AlertTriangle className="h-8 w-8 mb-2" />
                 <p className="text-center font-semibold">Camera Access Denied</p>
                 <p className="text-center text-sm">Please enable camera permissions.</p>
            </div>
          )}
           {hasCameraPermission === null && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                 <p className="text-center font-semibold">Requesting Camera...</p>
            </div>
          )}
           {!isCameraActive && snapshotTaken && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                 <p className="text-center font-semibold">Snapshot captured.</p>
            </div>
           )}
        </div>
         {snapshotTaken ? (
            <Button className="w-full" onClick={handleRetake} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Photo
            </Button>
         ) : (
            <Button className="w-full" disabled={!isCameraActive} onClick={handleTakeSnapshot}>
                <Camera className="mr-2 h-4 w-4" />
                Take Snapshot
            </Button>
         )}
      </CardContent>
    </Card>
  );
}
