import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (planId: string) => void;
  isSelected?: boolean;
}

export function PricingCard({ plan, onSelectPlan, isSelected }: PricingCardProps) {
  return (
    <Card className={`relative transition-all duration-300 ${
      plan.popular 
        ? 'ring-2 ring-accent shadow-glow bg-gradient-to-br from-card to-accent/5' 
        : 'hover:shadow-elegant border-border/50'
    } ${isSelected ? 'ring-2 ring-primary shadow-elegant' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-accent text-accent-foreground font-semibold px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-foreground">
              {plan.currency}{plan.price}
            </span>
            <span className="text-muted-foreground ml-1">/{plan.interval}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4">
          <Button 
            onClick={() => onSelectPlan(plan.id)}
            className={`w-full font-medium transition-all duration-300 ${
              plan.popular 
                ? 'bg-gradient-accent hover:shadow-glow' 
                : isSelected 
                  ? 'bg-gradient-primary' 
                  : 'bg-primary hover:bg-primary-glow'
            }`}
            variant={plan.popular ? "default" : "default"}
          >
            {plan.buttonText || 'Choose Plan'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}