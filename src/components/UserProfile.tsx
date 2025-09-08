import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { UserDetails } from "@/types/user";

interface UserProfileProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
}

const INDIAN_OCCUPATIONS = [
  "Farmer/Agricultural Worker",
  "Daily Wage Laborer", 
  "Shopkeeper/Retailer",
  "Driver (Taxi, Truck, Auto)",
  "Household Help/Domestic Worker",
  "Construction Worker",
  "Small Business Owner",
  "Government Employee",
  "Private Sector Employee",
  "Teacher/Educator",
  "Healthcare Worker",
  "IT Professional",
  "Engineer",
  "Student",
  "Homemaker",
  "Retired",
  "Unemployed",
  "Other"
];

const INCOME_RANGES = [
  "Up to ₹2.5 Lakh",
  "₹2.5 Lakh - ₹5 Lakh",
  "₹5 Lakh - ₹7.5 Lakh",
  "₹7.5 Lakh - ₹10 Lakh",
  "₹10 Lakh - ₹15 Lakh",
  "₹15 Lakh - ₹20 Lakh",
  "₹20 Lakh - ₹30 Lakh",
  "₹30 Lakh - ₹50 Lakh",
  "₹50 Lakh - ₹1 Crore",
  "₹1 Crore - ₹2 Crore",
  "₹2 Crore - ₹3 Crore",
  "Above ₹3 Crore"
];

const LANGUAGES = [
  "English", "Hindi", "Gujarati", "Tamil", "Telugu", 
  "Bengali", "Marathi", "Kannada"
];

const INSURANCE_TYPES = [
  "Term Life", "Health Insurance", "Car Insurance", 
  "Home Insurance", "Investment Plans", "None"
];

const HEALTH_CONDITIONS = [
  "None", "Diabetes", "Hypertension", "Heart Condition", 
  "Respiratory Issues", "Other Chronic Condition"
];

const UserProfile = ({ userDetails, setUserDetails }: UserProfileProps) => {
  const updateField = (field: keyof UserDetails, value: any) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleMultiSelect = (field: 'existing_insurance' | 'health_conditions', item: string, checked: boolean) => {
    const currentArray = userDetails[field];
    if (checked) {
      updateField(field, [...currentArray, item]);
    } else {
      updateField(field, currentArray.filter(i => i !== item));
    }
  };

  return (
    <div className="space-y-6">
      {/* Age */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Age: {userDetails.age}</Label>
        <Slider
          value={[userDetails.age]}
          onValueChange={(value) => updateField('age', value[0])}
          min={18}
          max={80}
          step={1}
          className="w-full"
        />
      </div>

      {/* Income Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Annual Income</Label>
        <Select value={userDetails.income_range} onValueChange={(value) => updateField('income_range', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select income range" />
          </SelectTrigger>
          <SelectContent>
            {INCOME_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Occupation */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Occupation</Label>
        <Select value={userDetails.occupation} onValueChange={(value) => updateField('occupation', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select occupation" />
          </SelectTrigger>
          <SelectContent>
            {INDIAN_OCCUPATIONS.map((occupation) => (
              <SelectItem key={occupation} value={occupation}>
                {occupation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Family Members */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Family Members: {userDetails.family_members}</Label>
        <Slider
          value={[userDetails.family_members]}
          onValueChange={(value) => updateField('family_members', value[0])}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Preferred Language</Label>
        <Select value={userDetails.language} onValueChange={(value) => updateField('language', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Existing Insurance */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Existing Insurance</Label>
        <Card className="p-3 bg-muted/20">
          <div className="space-y-2">
            {INSURANCE_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`insurance-${type}`}
                  checked={userDetails.existing_insurance.includes(type)}
                  onCheckedChange={(checked) => 
                    handleMultiSelect('existing_insurance', type, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`insurance-${type}`} 
                  className="text-sm cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Health Conditions */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Health Conditions</Label>
        <Card className="p-3 bg-muted/20">
          <div className="space-y-2">
            {HEALTH_CONDITIONS.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`health-${condition}`}
                  checked={userDetails.health_conditions.includes(condition)}
                  onCheckedChange={(checked) => 
                    handleMultiSelect('health_conditions', condition, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`health-${condition}`} 
                  className="text-sm cursor-pointer"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
