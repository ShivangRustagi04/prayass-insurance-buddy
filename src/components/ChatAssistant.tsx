import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, Shield, Heart } from "lucide-react";
import { UserDetails, ChatMessage } from "@/types/user";

interface ChatAssistantProps {
  userDetails: UserDetails;
}

const suggestedQuestions = [
  "What's the difference between term life and whole life insurance?",
  "How much life insurance coverage do I need?",
  "Which health insurance is best for my family?",
  "What are the tax benefits of insurance policies?",
  "Should I invest in ULIPs or traditional insurance?",
  "How to claim insurance benefits quickly?"
];

const ChatAssistant = ({ userDetails }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I'm PRAYAAS, your insurance assistant. I can help you understand insurance policies, answer your questions, and provide personalized advice based on your profile. Feel free to ask me anything about insurance!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse = generateBotResponse(messageToSend, userDetails);
    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  const generateBotResponse = (message: string, userDetails: UserDetails): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('term life') || lowerMessage.includes('life insurance')) {
      return `Based on your profile (age ${userDetails.age}, income ${userDetails.income_range}), I'd recommend considering term life insurance. Term life provides high coverage at low premiums, which is ideal for your family of ${userDetails.family_members} members. 

For someone in your income bracket, a coverage of 10-15 times your annual income is generally recommended. This would provide financial security for your family in case of unforeseen circumstances.

Would you like me to recommend specific term life insurance policies that match your profile?`;
    }
    
    if (lowerMessage.includes('health insurance') || lowerMessage.includes('medical')) {
      return `Health insurance is crucial for your family! With ${userDetails.family_members} members, I'd suggest looking at family floater health insurance policies.

Key considerations for your profile:
- Family floater vs individual policies
- Coverage amount (₹5-10 lakhs minimum recommended)
- Network hospitals in your area
- Pre-existing disease coverage
- Maternity benefits (if applicable)

Some good options include Star Health Red Carpet, HDFC Ergo My Health Suraksha, and Care Supreme. Would you like detailed comparisons?`;
    }
    
    if (lowerMessage.includes('tax benefit') || lowerMessage.includes('80c')) {
      return `Great question about tax benefits! Insurance policies offer excellent tax advantages:

**Section 80C Benefits:**
- Life insurance premiums: Up to ₹1.5 lakh deduction
- ELSS, PPF, and other investments also count

**Section 80D Benefits:**
- Health insurance premiums: Up to ₹25,000 for self/family
- Additional ₹25,000 for parents (₹50,000 if parents are senior citizens)

**Section 10(10D):**
- Life insurance maturity proceeds are tax-free

Given your income range of ${userDetails.income_range}, you could save significant taxes while securing your family's future!`;
    }
    
    if (lowerMessage.includes('ulip') || lowerMessage.includes('investment')) {
      return `ULIPs vs Traditional Insurance - good question for someone in your income bracket!

**ULIPs (Unit Linked Insurance Plans):**
- ✅ Market-linked returns potential
- ✅ Flexibility to switch funds
- ❌ Higher charges and complexity
- ❌ Market risk

**Traditional Insurance:**
- ✅ Guaranteed returns
- ✅ Simple and transparent
- ❌ Lower returns compared to equity markets

For your profile, I'd generally recommend:
1. Pure term insurance for protection
2. Separate mutual fund SIPs for investment
This typically gives better returns with lower costs!`;
    }
    
    if (lowerMessage.includes('claim') || lowerMessage.includes('settlement')) {
      return `Insurance claim settlement is crucial! Here's what to look for:

**Top insurers by claim settlement ratio (2023-24):**
- Max Life: 99.34%
- HDFC Life: 98.01%
- ICICI Prudential: 97.90%
- SBI Life: 97.83%

**Tips for smooth claims:**
1. Always disclose health conditions honestly
2. Keep all policy documents updated
3. Inform nominees about policies
4. Submit claims promptly with complete documentation
5. Follow up regularly

The key is choosing insurers with good claim settlement ratios and maintaining transparency throughout!`;
    }
    
    // Default response
    return `Thank you for your question! As your insurance assistant, I'm here to help you make informed decisions about insurance.

Based on your profile:
- Age: ${userDetails.age}
- Income: ${userDetails.income_range}
- Family: ${userDetails.family_members} members
- Occupation: ${userDetails.occupation}

I can provide personalized advice on life insurance, health insurance, investment plans, and more. Feel free to ask specific questions, or try one of the suggested topics below!

Is there a particular insurance type or concern you'd like to discuss?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Chat with PRAYAAS
          </CardTitle>
          <CardDescription>
            Ask me anything about insurance policies, coverage, claims, or get personalized advice
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-card border-0 h-96">
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow">
                    <AvatarFallback>
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about insurance policies, coverage, or claims..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputMessage.trim()}
                size="icon"
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            Suggested Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {suggestedQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="outline"
                className="justify-start p-3 h-auto cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSendMessage(question)}
              >
                <div className="flex items-center gap-2 w-full">
                  {index < 2 && <Shield className="w-4 h-4 text-primary flex-shrink-0" />}
                  {index >= 2 && index < 4 && <Heart className="w-4 h-4 text-success flex-shrink-0" />}
                  {index >= 4 && <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />}
                  <span className="text-sm text-left">{question}</span>
                </div>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;