import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardFormProps {
  onSubmit: (cardData: any) => void;
  isLoading?: boolean;
}

export function CreditCardForm({ onSubmit, isLoading }: CreditCardFormProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">Card Details</CardTitle>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>Secured with 256-bit SSL encryption</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardholderName" className="text-sm font-medium">
              Cardholder Name
            </Label>
            <Input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              value={cardData.cardholderName}
              onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cardNumber" className="text-sm font-medium">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({ 
                ...cardData, 
                cardNumber: formatCardNumber(e.target.value) 
              })}
              className="mt-1"
              maxLength={19}
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="expiryMonth" className="text-sm font-medium">
                Month
              </Label>
              <Input
                id="expiryMonth"
                type="text"
                placeholder="MM"
                value={cardData.expiryMonth}
                onChange={(e) => setCardData({ ...cardData, expiryMonth: e.target.value })}
                className="mt-1"
                maxLength={2}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryYear" className="text-sm font-medium">
                Year
              </Label>
              <Input
                id="expiryYear"
                type="text"
                placeholder="YY"
                value={cardData.expiryYear}
                onChange={(e) => setCardData({ ...cardData, expiryYear: e.target.value })}
                className="mt-1"
                maxLength={2}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-sm font-medium">
                CVV
              </Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                className="mt-1"
                maxLength={4}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:shadow-glow font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Complete Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}