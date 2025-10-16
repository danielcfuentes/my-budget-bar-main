import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Calendar, AlertCircle } from "lucide-react";

const SurvivorTab = () => {
  // Mock data
  const currentBalance = 2034.01; // Closing balance
  const monthlyBills = 1550.99;
  const monthlyIncome = 4300;
  
  const survivalRatio = currentBalance / monthlyBills;
  const survivalMonths = Math.floor(survivalRatio);
  const survivalDays = Math.round((survivalRatio - survivalMonths) * 30);
  
  const incomeVsBills = ((monthlyIncome - monthlyBills) / monthlyIncome) * 100;
  const projectedEndBalance = currentBalance + (monthlyIncome - monthlyBills);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Survivor Mode 🧠</h2>
        <p className="text-muted-foreground">Your financial resilience overview</p>
      </div>

      <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Survival Ratio</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            How long can you cover bills with current funds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-6xl font-bold">
                {survivalMonths}.{survivalDays}
              </p>
              <p className="text-xl">months of coverage</p>
            </div>
            <div className="w-full bg-primary-foreground/20 rounded-full h-4">
              <div 
                className="bg-primary-foreground rounded-full h-4 transition-all duration-500"
                style={{ width: `${Math.min(survivalRatio * 50, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Current Balance
            </CardTitle>
            <CardDescription>After close out</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${currentBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Bills
            </CardTitle>
            <CardDescription>Total obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              ${monthlyBills.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Bills Analysis</CardTitle>
          <CardDescription>Monthly comparison</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Monthly Income</p>
              <p className="text-2xl font-bold text-primary">
                +${monthlyIncome.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">Total Monthly Bills</p>
              <p className="text-2xl font-bold text-destructive">
                -${monthlyBills.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bills Coverage</span>
              <span className="font-medium">{incomeVsBills.toFixed(1)}% margin</span>
            </div>
            <Progress value={incomeVsBills} className="h-3" />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">Net Monthly</p>
              <p className={`text-2xl font-bold ${monthlyIncome - monthlyBills >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {monthlyIncome - monthlyBills >= 0 ? '+' : ''}${(monthlyIncome - monthlyBills).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Projected Month-End Balance
          </CardTitle>
          <CardDescription>If current trends continue</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-foreground mb-4">
            ${projectedEndBalance.toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            Based on current income and expenses
          </p>
        </CardContent>
      </Card>

      <Card className={`border-2 ${survivalRatio >= 1 ? 'border-primary bg-primary/5' : 'border-destructive bg-destructive/5'}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              survivalRatio >= 1 ? 'bg-primary/10' : 'bg-destructive/10'
            }`}>
              {survivalRatio >= 1 ? (
                <TrendingUp className={`w-6 h-6 text-primary`} />
              ) : (
                <AlertCircle className={`w-6 h-6 text-destructive`} />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                {survivalRatio >= 1.5 
                  ? "You're Thriving! 🎉" 
                  : survivalRatio >= 1 
                  ? "You're Surviving ✅" 
                  : "Plan Ahead ⚠️"
                }
              </h3>
              <p className="text-muted-foreground">
                {survivalRatio >= 1.5 
                  ? "You have excellent financial cushion. Consider building your savings or investing extra funds."
                  : survivalRatio >= 1 
                  ? "You can cover your bills, but building more reserves would increase your financial security."
                  : "Your current balance won't cover a full month of bills. Focus on reducing expenses or increasing income."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurvivorTab;
