import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Receipt } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  id: string;
  name: string;
  amountThisMonth: number;
  amountNextMonth: number;
  dueDate: string;
  calendarDay: number;
  category: "Rent" | "Need" | "Want" | "Debt" | "Savings" | "Investment";
  status: "Autopay" | "Scheduled" | "Needs Scheduling";
  bankAccount: string;
}

const BillsTab = () => {
  const [bills, setBills] = useState<Bill[]>([
    { id: "1", name: "Apartment Rent", amountThisMonth: 1019.68, amountNextMonth: 1019.68, dueDate: "2025-11-01", calendarDay: 1, category: "Rent", status: "Autopay", bankAccount: "Checking" },
    { id: "2", name: "Electric Bill", amountThisMonth: 90, amountNextMonth: 90, dueDate: "2025-10-20", calendarDay: 20, category: "Need", status: "Scheduled", bankAccount: "Checking" },
    { id: "3", name: "Spotify", amountThisMonth: 12.98, amountNextMonth: 12.98, dueDate: "2025-10-05", calendarDay: 5, category: "Want", status: "Autopay", bankAccount: "Checking" },
    { id: "4", name: "Savings", amountThisMonth: 500, amountNextMonth: 500, dueDate: "2025-10-15", calendarDay: 15, category: "Savings", status: "Scheduled", bankAccount: "Savings" },
  ]);
  const [isAddingBill, setIsAddingBill] = useState(false);

  const handleAddBill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dueDate = formData.get("dueDate") as string;
    const calendarDay = new Date(dueDate).getDate();
    
    const newBill: Bill = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      amountThisMonth: parseFloat(formData.get("amountThisMonth") as string),
      amountNextMonth: parseFloat(formData.get("amountNextMonth") as string),
      dueDate: dueDate,
      calendarDay: calendarDay,
      category: formData.get("category") as Bill["category"],
      status: formData.get("status") as Bill["status"],
      bankAccount: formData.get("bankAccount") as string,
    };
    setBills([...bills, newBill]);
    setIsAddingBill(false);
    toast.success("Bill added successfully!");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Rent":
        return "bg-primary text-primary-foreground";
      case "Need":
        return "bg-accent text-accent-foreground";
      case "Want":
        return "bg-secondary text-secondary-foreground";
      case "Debt":
        return "bg-destructive text-destructive-foreground";
      case "Savings":
        return "bg-green-600 text-white";
      case "Investment":
        return "bg-blue-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Autopay":
        return "border-primary text-primary";
      case "Scheduled":
        return "border-accent text-accent";
      case "Needs Scheduling":
        return "border-destructive text-destructive";
      default:
        return "border-muted text-muted-foreground";
    }
  };

  const totalBillsThisMonth = bills.reduce((sum, bill) => sum + bill.amountThisMonth, 0);
  const totalBillsNextMonth = bills.reduce((sum, bill) => sum + bill.amountNextMonth, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Bills</h2>
          <p className="text-muted-foreground">Manage your recurring expenses</p>
        </div>
        <Dialog open={isAddingBill} onOpenChange={setIsAddingBill}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bill</DialogTitle>
              <DialogDescription>Add a new bill to track</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBill} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bill-name">Bill Name</Label>
                <Input id="bill-name" name="name" placeholder="Electric Bill" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bill-amount-this">Bill Amount This Month</Label>
                <Input id="bill-amount-this" name="amountThisMonth" type="number" step="0.01" placeholder="85.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bill-amount-next">Bill Amount Next Month</Label>
                <Input id="bill-amount-next" name="amountNextMonth" type="number" step="0.01" placeholder="85.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bill-date">Bill Due Date (Calendar)</Label>
                <Input id="bill-date" name="dueDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Bill Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Need">Need</SelectItem>
                    <SelectItem value="Want">Want</SelectItem>
                    <SelectItem value="Debt">Debt</SelectItem>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account</Label>
                <Input id="bankAccount" name="bankAccount" placeholder="Checking" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">AutoPay Marker</Label>
                <Select name="status" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Autopay">Autopay</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Needs Scheduling">Needs Scheduling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Bill</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Total Bills
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            This period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">This Month:</span>
            <p className="text-3xl font-bold">${totalBillsThisMonth.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Next Month:</span>
            <p className="text-2xl font-bold">${totalBillsNextMonth.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {bills.map((bill) => (
          <Card key={bill.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-foreground">{bill.name}</h3>
                    <Badge className={getCategoryColor(bill.category)}>{bill.category}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">
                      Due: Day {bill.calendarDay} ({new Date(bill.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })})
                    </span>
                    <Badge variant="outline" className={getStatusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {bill.bankAccount}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    ${bill.amountThisMonth.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next: ${bill.amountNextMonth.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BillsTab;
