import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Shield, Zap } from "lucide-react";
import { PricingCard } from "@/components/payments/PricingCard";
import { PaymentMethodCard, paymentMethods } from "@/components/payments/PaymentMethodCard";
import { CreditCardForm } from "@/components/payments/CreditCardForm";
import { PaymentSummary } from "@/components/payments/PaymentSummary";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    currency: '$',
    interval: 'month',
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 5 projects',
      'Basic analytics',
      'Email support',
      'Mobile app access',
    ],
    buttonText: 'Start Basic',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29.99,
    currency: '$',
    interval: 'month',
    description: 'Best for growing businesses',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'Team collaboration',
    ],
    popular: true,
    buttonText: 'Go Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    currency: '$',
    interval: 'month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom onboarding',
      'Advanced security',
      'Bulk user management',
    ],
    buttonText: 'Contact Sales',
  },
];

type Step = 'plans' | 'payment-method' | 'payment-details' | 'success';

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState<Step>('plans');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedPlanData = pricingPlans.find(plan => plan.id === selectedPlan);
  const selectedMethodData = paymentMethods.find(method => method.id === selectedPaymentMethod);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep('payment-method');
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setCurrentStep('payment-details');
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated.",
      });
      
      setCurrentStep('success');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please check your payment details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'plans':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Choose Your Plan
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the perfect plan for your needs. Upgrade or downgrade anytime.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pricingPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onSelectPlan={handlePlanSelect}
                  isSelected={selectedPlan === plan.id}
                />
              ))}
            </div>
          </div>
        );

      case 'payment-method':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">Choose Payment Method</h1>
              <p className="text-muted-foreground">
                Select how you'd like to pay for your {selectedPlanData?.name} subscription
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={handlePaymentMethodSelect}
                />
              ))}
            </div>
          </div>
        );

      case 'payment-details':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold">Complete Your Payment</h1>
              <p className="text-muted-foreground">
                You're subscribing to {selectedPlanData?.name} via {selectedMethodData?.name}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {selectedPaymentMethod === 'credit-card' && (
                  <CreditCardForm
                    onSubmit={handlePaymentSubmit}
                    isLoading={isProcessing}
                  />
                )}
                
                {selectedPaymentMethod === 'paypal' && (
                  <Card className="shadow-card">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">PayPal Integration</h3>
                      <p className="text-muted-foreground">
                        PayPal SDK integration would be implemented here with their smart payment buttons.
                      </p>
                      <Button 
                        onClick={() => handlePaymentSubmit({})}
                        className="w-full bg-gradient-accent hover:shadow-glow"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Pay with PayPal'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {selectedPaymentMethod === 'razorpay' && (
                  <Card className="shadow-card">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                        <Zap className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">Razorpay Integration</h3>
                      <p className="text-muted-foreground">
                        Razorpay checkout script integration would be implemented here.
                      </p>
                      <Button 
                        onClick={() => handlePaymentSubmit({})}
                        className="w-full bg-gradient-primary hover:shadow-glow"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                {selectedPlanData && selectedPaymentMethod && (
                  <PaymentSummary
                    planName={selectedPlanData.name}
                    planPrice={selectedPlanData.price}
                    currency={selectedPlanData.currency}
                    interval={selectedPlanData.interval}
                    paymentMethod={selectedMethodData?.name || ''}
                    discount={{
                      amount: 5.00,
                      description: 'First month discount'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-success-foreground" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-success">Payment Successful!</h1>
              <p className="text-lg text-muted-foreground">
                Welcome to {selectedPlanData?.name}! Your subscription is now active.
              </p>
            </div>
            
            <Card className="shadow-card bg-gradient-subtle">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">What's Next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check your email for the confirmation receipt</li>
                  <li>• Access your new features in the dashboard</li>
                  <li>• Set up your team and start collaborating</li>
                </ul>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => {
                setCurrentStep('plans');
                setSelectedPlan(null);
                setSelectedPaymentMethod(null);
              }}
              className="bg-gradient-primary hover:shadow-glow"
            >
              Go to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {currentStep !== 'plans' && currentStep !== 'success' && (
          <Button
            variant="ghost"
            onClick={() => {
              if (currentStep === 'payment-method') setCurrentStep('plans');
              if (currentStep === 'payment-details') setCurrentStep('payment-method');
            }}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        
        {renderStepContent()}
      </div>
    </div>
  );
}