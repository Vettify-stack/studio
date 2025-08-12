
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "What is Vettify?",
        answer: "Vettify is a compliance and vetting solutions platform designed to ensure drivers, employers, and transport operators meet the requirements of the South African National Road Traffic Act."
    },
    {
        question: "Who can use Vettify?",
        answer: "Our platform serves a wide range of users including individual drivers, employers, transport operators (taxi, bus, and trucking companies), recruitment agencies, and even government departments."
    },
    {
        question: "How do I pay my subscription?",
        answer: "You can pay your subscription from the Driver Dashboard. Look for the 'Pay Subscription Now' button in the sidebar menu."
    },
    {
        question: "Where can I manage my documents?",
        answer: "In the Driver Dashboard, you'll find a 'Documents' card where you can upload and manage your CV, ID, licenses, and other important files."
    },
    {
        question: "How do I book a license renewal?",
        answer: "On the Driver Dashboard, use the 'License & PrDP Renewal Booking' card. You can select your province, city, and testing centre to find an available slot."
    },
];

type Message = {
    from: 'user' | 'bot';
    text: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { from: 'bot', text: "Hello! How can I help you today? You can select a common question below or type your own." }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    const handleQuestionClick = (question: string, answer: string) => {
        setMessages(prev => [
            ...prev,
            { from: 'user', text: question },
            { from: 'bot', text: answer }
        ]);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = { from: 'user', text: inputValue };
        const botResponse: Message = { from: 'bot', text: "Thank you for your question. I can provide the best support for the topics listed as buttons. Please select one of them." };

        setMessages(prev => [...prev, userMessage, botResponse]);
        setInputValue('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <Card className="w-80 h-96 flex flex-col shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground">
                        <div className='flex items-center gap-2'>
                            <Bot className="h-6 w-6" />
                            <CardTitle className="text-lg">Support Chat</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleToggle} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-hidden">
                       <ScrollArea className="h-full pr-4">
                           <div className="space-y-4">
                               {messages.map((msg, index) => (
                                   <div key={index} className={cn("flex items-start gap-2", msg.from === 'user' && 'justify-end')}>
                                       {msg.from === 'bot' && (
                                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                                               <Bot className="h-5 w-5" />
                                           </div>
                                       )}
                                       <div className={cn("rounded-lg p-3 text-sm max-w-[85%]", msg.from === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                           <p>{msg.text}</p>
                                       </div>
                                   </div>
                               ))}
                               {messages.length === 1 && (
                                   <div className='space-y-2 pt-2'>
                                       {faqs.map((faq, index) => (
                                           <Button key={index} variant="outline" size="sm" className="w-full text-left justify-start" onClick={() => handleQuestionClick(faq.question, faq.answer)}>
                                               {faq.question}
                                           </Button>
                                       ))}
                                   </div>
                               )}
                           </div>
                       </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                            <Input 
                                placeholder="Type a message..." 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button type="submit" size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button onClick={handleToggle} className="rounded-full h-16 w-16 shadow-lg" aria-label="Open support chat">
                    <MessageSquare className="h-8 w-8" />
                </Button>
            )}
        </div>
    );
}
