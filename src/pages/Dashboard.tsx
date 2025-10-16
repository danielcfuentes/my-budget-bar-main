import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Wallet, 
  Beer, 
  Receipt, 
  CheckCircle2, 
  TrendingUp,
  LogOut,
  Menu,
  X
} from "lucide-react";
import BankTab from "@/components/tabs/BankTab";
import PaycheckTab from "@/components/tabs/PaycheckTab";
import CoasterTab from "@/components/tabs/CoasterTab";
import BillsTab from "@/components/tabs/BillsTab";
import CloseOutTab from "@/components/tabs/CloseOutTab";
import SurvivorTab from "@/components/tabs/SurvivorTab";

type Tab = "bank" | "paycheck" | "coaster" | "bills" | "closeout" | "survivor";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("bank");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "bank" as Tab, label: "Bank", icon: Building2 },
    { id: "paycheck" as Tab, label: "Paycheck", icon: Wallet },
    { id: "coaster" as Tab, label: "Coaster", icon: Beer },
    { id: "bills" as Tab, label: "Bills", icon: Receipt },
    { id: "closeout" as Tab, label: "Close Out", icon: CheckCircle2 },
    { id: "survivor" as Tab, label: "Survivor", icon: TrendingUp },
  ];

  const handleLogout = () => {
    navigate("/auth");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "bank":
        return <BankTab />;
      case "paycheck":
        return <PaycheckTab />;
      case "coaster":
        return <CoasterTab />;
      case "bills":
        return <BillsTab />;
      case "closeout":
        return <CloseOutTab />;
      case "survivor":
        return <SurvivorTab />;
      default:
        return <BankTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Beer className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">My Budget Bar</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <nav className="space-y-2 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card hover:bg-muted text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full mt-4 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </nav>
          </aside>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-background z-40 animate-slide-in">
              <div className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-card hover:bg-muted text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full mt-4 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 animate-fade-in">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
