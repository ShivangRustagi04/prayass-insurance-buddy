import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Search, TrendingUp, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { UserDetails, PolicyData } from "@/types/user";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

interface PolicyAnalysisProps {
  userDetails: UserDetails;
}

const PolicyAnalysis = ({ userDetails }: PolicyAnalysisProps) => {
  const [policyName, setPolicyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PolicyData | null>(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const handleAnalyzePolicy = async () => {
    if (!policyName.trim()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock analysis result
    const mockResult: PolicyData = {
      policy_name: policyName,
      premium_range: "₹15,000 - ₹20,000",
      coverage_amount: "₹20 Lakhs",
      policy_term: "25 years",
      key_features: [
        "Comprehensive life cover with maturity benefits",
        "Tax benefits under Section 80C and 10(10D)",
        "Flexible premium payment options",
        "Accidental death and disability benefit",
        "Option to increase coverage without medical checkup"
      ],
      suitability_score: 78,
      claim_settlement_ratio: 87,
      flexibility_score: 72,
      avg_premium: 17500,
      coverage_value: 2000000,
      affordability_score: 82,
      coverage_score: 75,
      benefits_score: 85
    };
    
    setAnalysisResult(mockResult);
    setShowVisualization(true);
    setLoading(false);
  };

  const getRadarData = () => {
    if (!analysisResult) return [];
    return [
      {
        subject: 'Affordability',
        value: analysisResult.affordability_score || 70,
      },
      {
        subject: 'Coverage',
        value: analysisResult.coverage_score || 75,
      },
      {
        subject: 'Benefits',
        value: analysisResult.benefits_score || 80,
      },
      {
        subject: 'Claims',
        value: analysisResult.claim_settlement_ratio,
      },
      {
        subject: 'Flexibility',
        value: analysisResult.flexibility_score,
      },
      {
        subject: 'Overall',
        value: analysisResult.suitability_score,
      },
    ];
  };

  const getTimelineData = () => {
    const age = userDetails.age;
    return Array.from({ length: 6 }, (_, i) => ({
      age: age + i * 5,
      benefits: 100000 * Math.pow(1.05, i * 5),
      premiumsPaid: 17500 * (i * 5),
    }));
  };

  const getMetricsData = () => {
    if (!analysisResult) return [];
    return [
      { name: 'Affordability', score: analysisResult.affordability_score || 70 },
      { name: 'Coverage', score: analysisResult.coverage_score || 75 },
      { name: 'Benefits', score: analysisResult.benefits_score || 80 },
      { name: 'Claims', score: analysisResult.claim_settlement_ratio },
      { name: 'Flexibility', score: analysisResult.flexibility_score },
    ];
  };

  const getSuitabilityStatus = (score: number) => {
    if (score >= 70) return { icon: CheckCircle, color: "text-success", text: "Recommended" };
    if (score >= 50) return { icon: AlertTriangle, color: "text-warning", text: "Moderately Recommended" };
    return { icon: AlertTriangle, color: "text-destructive", text: "Not Recommended" };
  };

  const status = analysisResult ? getSuitabilityStatus(analysisResult.suitability_score) : null;

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Policy Deep Analysis
          </CardTitle>
          <CardDescription>
            Enter any insurance policy name to get comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., LIC Jeevan Anand, HDFC Life Sanchay Plus..."
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleAnalyzePolicy}
              disabled={loading || !policyName.trim()}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysisResult && status && (
        <>
          {/* Policy Overview */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{analysisResult.policy_name}</CardTitle>
                <Badge 
                  variant={analysisResult.suitability_score >= 70 ? "default" : analysisResult.suitability_score >= 50 ? "secondary" : "destructive"}
                  className="flex items-center gap-1"
                >
                  <status.icon className={`w-3 h-3 ${status.color}`} />
                  {status.text}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Premium Range</p>
                  <p className="font-semibold text-lg">{analysisResult.premium_range}</p>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="font-semibold text-lg">{analysisResult.coverage_amount}</p>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="font-semibold text-lg">{analysisResult.policy_term}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Key Features
                </h4>
                <div className="grid gap-2">
                  {analysisResult.key_features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {showVisualization && (
            <div className="grid gap-6">
              {/* Radar Chart */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Comprehensive Score Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={getRadarData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Metrics Bar Chart */}
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Policy Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getMetricsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="score" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Timeline Projection */}
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Benefit Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getTimelineData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="benefits" stroke="hsl(var(--success))" strokeWidth={2} name="Benefits" />
                        <Line type="monotone" dataKey="premiumsPaid" stroke="hsl(var(--destructive))" strokeWidth={2} name="Premiums Paid" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Suitability Summary */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Final Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <status.icon className={`w-5 h-5 ${status.color}`} />
                      <span className="font-semibold">{status.text}</span>
                    </div>
                    <Badge variant="outline">
                      Suitability: {analysisResult.suitability_score}%
                    </Badge>
                  </div>
                  <Progress value={analysisResult.suitability_score} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    This policy has been analyzed against your profile including age ({userDetails.age}), 
                    income ({userDetails.income_range}), family size ({userDetails.family_members} members), 
                    and current insurance portfolio.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PolicyAnalysis;