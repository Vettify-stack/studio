
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
import { Video, Camera, AlertTriangle, RefreshCw, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LivelinessCheckCardProps {
  onSnapshot?: (dataUri: string) => void;
}

export default function LivelinessCheckCard({ onSnapshot }: LivelinessCheckCardProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [snapshotDataUri, setSnapshotDataUri] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    setSnapshotDataUri(null);
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
    // Clean up camera stream when component unmounts
    return () => {
        stopCameraStream();
    }
  }, [stopCameraStream]);

  const handleToggleCamera = () => {
    if (isCameraActive) {
      stopCameraStream();
    } else {
      startCameraStream();
    }
  };

  const handleTakeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const dataUri = canvas.toDataURL('image/jpeg');
    setSnapshotDataUri(dataUri);
    stopCameraStream();

    if (onSnapshot) {
      onSnapshot(dataUri);
    } else {
      toast({
          title: "Snapshot Taken!",
          description: "Your photo has been captured for verification.",
      });
    }
  }

  const handleRetake = () => {
    setSnapshotDataUri(null);
    startCameraStream();
  }

  const renderContent = () => {
      if (snapshotDataUri) {
        return (
          <>
            <img src={snapshotDataUri} alt="Snapshot" className="h-full w-full object-cover" />
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                 <p className="text-center font-semibold">Snapshot captured.</p>
            </div>
          </>
        )
      }
      return (
        <>
            <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
            {!isCameraActive && hasCameraPermission !== false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                    <VideoOff className="h-8 w-8 mb-2" />
                    <p className="text-center font-semibold">Camera is off</p>
                </div>
            )}
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                    <AlertTriangle className="h-8 w-8 mb-2" />
                    <p className="text-center font-semibold">Camera Access Denied</p>
                    <p className="text-center text-sm">Please enable camera permissions.</p>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </>
      )
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
              {onSnapshot ? 'Use your camera to scan a document.' : 'Complete a quick liveliness check to secure your account.'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-muted">
            {renderContent()}
        </div>
        <div className="flex gap-2">
            <Button className="w-full" onClick={handleToggleCamera} variant={isCameraActive ? "destructive" : "outline"}>
                {isCameraActive ? <VideoOff className="mr-2 h-4 w-4" /> : <Camera className="mr-2 h-4 w-4" />}
                {isCameraActive ? 'Stop Camera' : 'Start Camera'}
            </Button>
            {snapshotDataUri ? (
                <Button className="w-full" onClick={handleRetake} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retake Photo
                </Button>
            ) : (
                <Button className="w-full" disabled={!isCameraActive} onClick={handleTakeSnapshot}>
                    <Camera className="mr-2 h-4 w-4" />
                    {onSnapshot ? 'Scan Document' : 'Take Snapshot'}
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
