import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Zap } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (methodId: string) => void;
}

export function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-elegant ${
        isSelected 
          ? 'ring-2 ring-primary shadow-elegant bg-gradient-to-br from-card to-primary/5' 
          : 'border-border/50 hover:border-border'
      }`}
      onClick={() => onSelect(method.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${
              isSelected 
                ? 'bg-gradient-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {method.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          </div>
          {method.popular && (
            <Badge variant="secondary" className="text-xs">
              Popular
            </Badge>
          )}
        </div>
        
        <ul className="space-y-2">
          {method.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: <CreditCard className="h-5 w-5" />,
    features: ['Instant processing', 'Buyer protection', 'Global coverage'],
    popular: true,
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Credit/Debit cards & UPI',
    icon: <Shield className="h-5 w-5" />,
    features: ['Multiple payment options', 'Secure transactions', 'Local support'],
  },
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Direct card payment',
    icon: <Zap className="h-5 w-5" />,
    features: ['Fast checkout', 'Secure encryption', '24/7 support'],
  },
];