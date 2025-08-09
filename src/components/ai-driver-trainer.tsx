
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, Bot, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const trainingTopics: Record<string, string> = {
    "Defensive Driving": "Defensive driving involves anticipating dangerous situations, despite the conditions or the actions of others. Key tips: Maintain a safe following distance (3-second rule), always be aware of your surroundings, and avoid distractions like using your phone.",
    "Rollover Prevention": "Rollover prevention is crucial for high-center-of-gravity vehicles. Key tips: Avoid sharp turns at high speeds, be cautious of soft road shoulders, and never overload your vehicle. Slow down significantly on curves and ramps.",
    "Fatigue Management": "To manage fatigue, ensure you get 7-9 hours of sleep before a long drive. Take a 15-minute break every 2 hours. If you feel drowsy, pull over to a safe place to rest. Avoid driving during your body's natural low-energy periods, like late at night.",
    "Hearts and Minds": "The 'Hearts and Minds' approach is about your attitude. A positive and safety-first mindset reduces risk-taking. Remember that your decisions affect not only you but everyone on the road. Drive with professionalism and courtesy.",
    "Driver Wellness": "Driver wellness is about your physical and mental health. Eat nutritious meals, stay hydrated, and get regular exercise. Managing stress through techniques like deep breathing can also improve your focus and reaction time on the road.",
    "Time Management": "Effective time management reduces the pressure to speed. Plan your trips in advance, check for traffic and weather, and allow for extra time. It's better to arrive a few minutes late than to take unnecessary risks on the road."
};

const genericResponse = "Thanks for your question. I can currently provide detailed information on the topics listed below. Please select one for assistance.";

export default function AIDriverTrainer() {
  const [messages, setMessages] = useState<{from: 'user' | 'bot', text: string}[]>([
      { from: 'bot', text: "Hello! I'm your AI Driver Trainer. Select a topic below or type a question to get started." }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleTopicSelect = (topic: string) => {
    const userMessage = { from: 'user' as const, text: `Tell me about ${topic}` };
    const botResponse = { from: 'bot' as const, text: trainingTopics[topic] || "I don't have information on that topic right now."};
    setMessages(prev => [...prev, userMessage, botResponse]);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const userMessage = { from: 'user' as const, text: inputValue };
      const botResponse = { from: 'bot' as const, text: genericResponse };
      
      setMessages(prev => [...prev, userMessage, botResponse]);
      setInputValue('');
  }

  return (
    <Card className="transition-all hover:shadow-lg h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Driver Trainer</CardTitle>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>
          Your personal AI assistant for driving best practices.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="flex-grow space-y-4 overflow-y-auto p-4 bg-muted/50 rounded-lg h-64">
           {messages.map((msg, index) => (
               <div key={index} className={`flex items-start gap-3 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                   {msg.from === 'bot' && (
                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </div>
                   )}
                    <div className={`rounded-lg p-3 text-sm max-w-[80%] ${msg.from === 'bot' ? 'bg-background' : 'bg-primary text-primary-foreground'}`}>
                        <p>{msg.text}</p>
                    </div>
                </div>
           ))}
        </div>
        <div className="flex flex-wrap gap-2">
            {Object.keys(trainingTopics).map(topic => (
                <Button key={topic} size="sm" variant="outline" onClick={() => handleTopicSelect(topic)}>
                    {topic}
                </Button>
            ))}
        </div>
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-4 border-t">
            <Input 
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
            />
            <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
