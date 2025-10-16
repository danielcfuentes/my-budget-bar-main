import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, DollarSign, Plus } from "lucide-react";
import { toast } from "sonner";

interface Income {
  id: string;
  name: string;
  amountThisMonth: number;
  amountNextMonth: number;
  dueDate: string;
  bankAccount: string;
}

const PaycheckTab = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: "1", name: "Salary", amountThisMonth: 3500, amountNextMonth: 3500, dueDate: "2025-10-25", bankAccount: "Checking" },
    { id: "2", name: "Freelance Project", amountThisMonth: 800, amountNextMonth: 0, dueDate: "2025-10-28", bankAccount: "Checking" },
  ]);
  const [isAddingIncome, setIsAddingIncome] = useState(false);

  const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIncome: Income = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      amountThisMonth: parseFloat(formData.get("amountThisMonth") as string),
      amountNextMonth: parseFloat(formData.get("amountNextMonth") as string),
      dueDate: formData.get("dueDate") as string,
      bankAccount: formData.get("bankAccount") as string,
    };
    setIncomes([...incomes, newIncome]);
    setIsAddingIncome(false);
    toast.success("Income added successfully!");
  };

  const nextIncome = incomes.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
  const daysUntilNext = nextIncome
    ? Math.ceil((new Date(nextIncome.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalIncomeThisMonth = incomes.reduce((sum, inc) => sum + inc.amountThisMonth, 0);
  const totalIncomeNextMonth = incomes.reduce((sum, inc) => sum + inc.amountNextMonth, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Paycheck</h2>
          <p className="text-muted-foreground">Track your upcoming income</p>
        </div>
        <Dialog open={isAddingIncome} onOpenChange={setIsAddingIncome}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Income</DialogTitle>
              <DialogDescription>Add a new income source</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddIncome} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income-name">Income Name</Label>
                <Input id="income-name" name="name" placeholder="Salary" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amountThisMonth">Income Amount This Month</Label>
                <Input id="amountThisMonth" name="amountThisMonth" type="number" step="0.01" placeholder="3500.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amountNextMonth">Income Amount Next Month</Label>
                <Input id="amountNextMonth" name="amountNextMonth" type="number" step="0.01" placeholder="3500.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Income Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account</Label>
                <Input id="bankAccount" name="bankAccount" placeholder="Checking" required />
              </div>
              <Button type="submit" className="w-full">Add Income</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Next Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-2">{daysUntilNext} days</p>
            {nextIncome && (
              <p className="text-sm text-primary-foreground/80">
                {nextIncome.name} - ${nextIncome.amountThisMonth.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Total Expected Income
            </CardTitle>
            <CardDescription>Monthly totals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">This Month:</span>
              <span className="text-2xl font-bold text-foreground">${totalIncomeThisMonth.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Month:</span>
              <span className="text-2xl font-bold text-foreground">${totalIncomeNextMonth.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Income</CardTitle>
          <CardDescription>Scheduled payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incomes.map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{income.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(income.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} • {income.bankAccount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    +${income.amountThisMonth.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next: ${income.amountNextMonth.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaycheckTab;
