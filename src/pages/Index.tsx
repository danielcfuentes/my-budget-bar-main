import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Beer, TrendingUp, Shield, Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
              <Beer className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              My Budget Bar
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Manage your daily money awareness using a friendly bar tab metaphor
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <div className="bg-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Track Daily Spending</h3>
              <p className="text-muted-foreground">
                Coast through your expenses with our intuitive daily tracker
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Manage Bills</h3>
              <p className="text-muted-foreground">
                Never miss a payment with smart bill tracking and reminders
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Financial Insights</h3>
              <p className="text-muted-foreground">
                See your survival ratio and stay financially resilient
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
