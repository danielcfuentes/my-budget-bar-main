import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, DollarSign, TrendingDown } from "lucide-react";

const CloseOutTab = () => {
  // Mock data
  const realBankBalance = 2384.50; // After coasting
  const billsDueBeforePaycheck = [
    { name: "Electric Bill", amount: 85 },
    { name: "Netflix", amount: 15.99 },
    { name: "Credit Card Payment", amount: 250 },
  ];
  
  const totalBillsDue = billsDueBeforePaycheck.reduce((sum, bill) => sum + bill.amount, 0);
  const closingBalance = realBankBalance - totalBillsDue;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Close Out</h2>
        <p className="text-muted-foreground">Summary before next paycheck</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Real Bank Balance
            </CardTitle>
            <CardDescription>After coasting</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${realBankBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Bills Due
            </CardTitle>
            <CardDescription>Before next income</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              -${totalBillsDue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Closing Balance
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              After bills paid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${closingBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills Included in Close Out</CardTitle>
          <CardDescription>Due before next paycheck</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billsDueBeforePaycheck.map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{bill.name}</p>
                </div>
                <p className="text-lg font-bold text-destructive">
                  -${bill.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-foreground">Total Impact</p>
              <p className="text-2xl font-bold text-destructive">
                -${totalBillsDue.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {closingBalance >= 0 ? "You're in good shape!" : "Caution: Negative balance"}
            </h3>
            <p className="text-muted-foreground">
              {closingBalance >= 0 
                ? `You'll have $${closingBalance.toFixed(2)} remaining after all bills are paid.`
                : `You're short by $${Math.abs(closingBalance).toFixed(2)}. Consider adjusting your spending or payment schedule.`
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CloseOutTab;
