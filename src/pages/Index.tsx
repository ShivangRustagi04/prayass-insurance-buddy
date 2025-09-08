import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, MessageCircle, Search, BarChart3 } from "lucide-react";
import UserProfile from "@/components/UserProfile";
import PolicyRecommendations from "@/components/PolicyRecommendations";
import PolicyAnalysis from "@/components/PolicyAnalysis";
import ChatAssistant from "@/components/ChatAssistant";
import { UserDetails } from "@/types/user";

const Index = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    age: 30,
    income_range: "₹5 Lakh - ₹7.5 Lakh",
    occupation: "Private Sector Employee",
    family_members: 4,
    existing_insurance: [],
    health_conditions: ["None"],
    language: "English"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  PRAYAAS
                </h1>
                <p className="text-sm text-muted-foreground">Simplifying Insurance for Everyone</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Welcome to your Insurance Companion</p>
              <p className="text-xs text-muted-foreground">Making insurance decisions simple and clear</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Your Profile
              </h2>
              <UserProfile userDetails={userDetails} setUserDetails={setUserDetails} />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="recommendations" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Policy Analysis
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations">
                <PolicyRecommendations userDetails={userDetails} />
              </TabsContent>

              <TabsContent value="analysis">
                <PolicyAnalysis userDetails={userDetails} />
              </TabsContent>

              <TabsContent value="chat">
                <ChatAssistant userDetails={userDetails} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t bg-muted/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">PRAYAAS Insurance Simplifier</span>
          </div>
          <p className="text-sm text-muted-foreground">
            ℹ️ Disclaimer: This is an AI-powered insurance assistant. For official policy details and purchases, please consult with licensed insurance providers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;