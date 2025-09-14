import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface PaymentSummaryProps {
  planName: string;
  planPrice: number;
  currency: string;
  interval: string;
  paymentMethod: string;
  discount?: {
    amount: number;
    description: string;
  };
}

export function PaymentSummary({ 
  planName, 
  planPrice, 
  currency, 
  interval, 
  paymentMethod,
  discount 
}: PaymentSummaryProps) {
  const discountAmount = discount?.amount || 0;
  const finalAmount = planPrice - discountAmount;

  return (
    <Card className="shadow-card border-border/50 bg-gradient-subtle">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Order Summary
          <Badge variant="secondary" className="text-xs">
            {interval}ly billing
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Plan</span>
            <span className="font-medium">{planName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <span className="font-medium capitalize">{paymentMethod}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-medium">{currency}{planPrice.toFixed(2)}</span>
          </div>
          
          {discount && (
            <div className="flex justify-between items-center text-success">
              <span className="text-sm">{discount.description}</span>
              <span className="font-medium">-{currency}{discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{currency}{finalAmount.toFixed(2)}</span>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p>• Your subscription will automatically renew every {interval}</p>
          <p>• You can cancel anytime from your account settings</p>
          <p>• All payments are secured with industry-standard encryption</p>
        </div>
      </CardContent>
    </Card>
  );
}