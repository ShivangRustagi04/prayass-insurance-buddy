import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, Shield, Heart, DollarSign, Users } from "lucide-react";
import { UserDetails, PolicyRecommendation } from "@/types/user";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PolicyRecommendationsProps {
  userDetails: UserDetails;
}

const mockPolicyRecommendations: PolicyRecommendation[] = [
  {
    name: "Jeevan Anand Plus",
    company: "LIC of India",
    premium: "₹12,000 - ₹15,000",
    coverage: "₹15 Lakhs",
    suitability: 85,
    keyFeatures: ["Death Benefit", "Maturity Benefit", "Tax Benefits", "Loan Facility"],
    description: "A comprehensive life insurance plan with savings component"
  },
  {
    name: "Star Health Red Carpet",
    company: "Star Health Insurance",
    premium: "₹8,500 - ₹12,000",
    coverage: "₹10 Lakhs Family",
    suitability: 78,
    keyFeatures: ["Family Coverage", "Pre-existing Disease Cover", "No Room Rent Limit", "Wellness Benefits"],
    description: "Premium health insurance with comprehensive family coverage"
  },
  {
    name: "HDFC Life Click 2 Protect Plus",
    company: "HDFC Life",
    premium: "₹6,000 - ₹9,000",
    coverage: "₹25 Lakhs",
    suitability: 92,
    keyFeatures: ["Pure Term Plan", "High Coverage", "Online Application", "Accidental Benefits"],
    description: "Affordable term insurance with high coverage at low premiums"
  }
];

const PolicyRecommendations = ({ userDetails }: PolicyRecommendationsProps) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PolicyRecommendation[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRecommendations(mockPolicyRecommendations);
    setShowAnalytics(true);
    setLoading(false);
  };

  const getRecommendationData = () => {
    if (userDetails.age > 50) {
      return [
        { name: 'Health Insurance', value: 45, color: '#ef4444' },
        { name: 'Critical Illness', value: 35, color: '#f97316' },
        { name: 'Senior Benefits', value: 20, color: '#eab308' }
      ];
    } else if (userDetails.family_members > 3) {
      return [
        { name: 'Family Health', value: 40, color: '#22c55e' },
        { name: 'Term Life', value: 35, color: '#3b82f6' },
        { name: 'Child Education', value: 25, color: '#a855f7' }
      ];
    } else {
      return [
        { name: 'Term Life', value: 45, color: '#3b82f6' },
        { name: 'Health Insurance', value: 35, color: '#22c55e' },
        { name: 'Investment', value: 20, color: '#f59e0b' }
      ];
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getSuitabilityBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Personalized Policy Recommendations
              </CardTitle>
              <CardDescription>
                Get insurance policies tailored to your profile and needs
              </CardDescription>
            </div>
            <Button 
              onClick={handleGetRecommendations}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
          </div>
        </CardHeader>
        
        {recommendations.length > 0 && (
          <CardContent>
            <div className="grid gap-4">
              {recommendations.map((policy, index) => (
                <Card key={index} className="border border-border/50 hover:shadow-card transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.company}</p>
                      </div>
                      <Badge 
                        variant={getSuitabilityBadgeVariant(policy.suitability)}
                        className="ml-2"
                      >
                        {policy.suitability}% Match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{policy.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Premium</p>
                          <p className="font-medium">{policy.premium}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-success" />
                        <div>
                          <p className="text-xs text-muted-foreground">Coverage</p>
                          <p className="font-medium">{policy.coverage}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Suitability Score</p>
                      <Progress value={policy.suitability} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {policy.keyFeatures.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {showAnalytics && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Recommended Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={getRecommendationData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getRecommendationData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Suitability Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={recommendations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="suitability" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PolicyRecommendations;