import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Beer, Calendar, Plus, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface Expense {
  id: string;
  name: string;
  bankAccount: string;
  amount: number;
  date: string;
}

const CoasterTab = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "Coffee", bankAccount: "Checking", amount: 5.50, date: "2025-10-16" },
    { id: "2", name: "Lunch", bankAccount: "Checking", amount: 15.00, date: "2025-10-16" },
    { id: "3", name: "Gas", bankAccount: "Credit Card", amount: 45.00, date: "2025-10-15" },
  ]);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [realBankBalance] = useState(2450.50);

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      bankAccount: formData.get("bankAccount") as string,
      amount: parseFloat(formData.get("amount") as string),
      date: formData.get("date") as string,
    };
    setExpenses([...expenses, newExpense]);
    setIsAddingExpense(false);
    toast.success("Coasting expense added!");
  };

  const daysUntilPaycheck = 9; // Mock value
  const totalCoasted = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const adjustedBalance = realBankBalance - totalCoasted;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Coaster 🍺</h2>
          <p className="text-muted-foreground">Track your daily spending</p>
        </div>
        <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Coast Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogDescription>Log a daily expense</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-name">Coasting Expense</Label>
                <Input id="expense-name" name="name" placeholder="Coffee, Groceries, etc." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account</Label>
                <Input id="bankAccount" name="bankAccount" placeholder="Checking" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Coasting Expense Amount</Label>
                <Input id="expense-amount" name="amount" type="number" step="0.01" placeholder="5.50" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-date">Coasting Item Expense Date (Calendar)</Label>
                <Input id="expense-date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
              </div>
              <Button type="submit" className="w-full">Add Coasting Expense</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Days Until Paycheck
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{daysUntilPaycheck}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Total Coasted
            </CardTitle>
            <CardDescription>Since last paycheck</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              -${totalCoasted.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beer className="w-5 h-5" />
              Real Balance
            </CardTitle>
            <CardDescription>After coasting</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              ${adjustedBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your coaster tab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} • {expense.bankAccount}
                  </p>
                </div>
                <p className="text-lg font-bold text-destructive">
                  -${expense.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoasterTab;
