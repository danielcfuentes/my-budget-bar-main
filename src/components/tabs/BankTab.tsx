import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CreditCard, Landmark, PiggyBank, Plus } from "lucide-react";
import { toast } from "sonner";

interface BankAccount {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
}

const BankTab = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: "1", name: "Chase Checking", type: "checking", balance: 2450.50 },
    { id: "2", name: "Savings Account", type: "savings", balance: 8750.00 },
    { id: "3", name: "Credit Card", type: "credit", balance: -850.25 },
  ]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Building2 className="w-6 h-6" />;
      case "savings":
        return <PiggyBank className="w-6 h-6" />;
      case "credit":
        return <CreditCard className="w-6 h-6" />;
      case "investment":
        return <Landmark className="w-6 h-6" />;
      default:
        return <Building2 className="w-6 h-6" />;
    }
  };

  const handleAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      type: formData.get("type") as BankAccount["type"],
      balance: parseFloat(formData.get("balance") as string),
    };
    setAccounts([...accounts, newAccount]);
    setIsAddingAccount(false);
    toast.success("Bank account added successfully!");
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Bank Accounts</h2>
          <p className="text-muted-foreground">Manage your financial accounts</p>
        </div>
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>Add a new account to track your finances</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Account Name</Label>
                <Input id="name" name="name" placeholder="Chase Checking" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Account Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input id="balance" name="balance" type="number" step="0.01" placeholder="1000.00" required />
              </div>
              <Button type="submit" className="w-full">Add Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Across all accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            ${totalBalance.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
              <div className="text-primary">{getAccountIcon(account.type)}</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                <p className={`text-2xl font-bold ${account.balance < 0 ? "text-destructive" : "text-foreground"}`}>
                  ${Math.abs(account.balance).toFixed(2)}
                  {account.balance < 0 && " CR"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BankTab;
