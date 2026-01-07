import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";

// Layout
import DashboardLayout from "@/components/layout/DashboardLayout";

// Public Pages
import Gateway from "@/pages/Gateway";
import FounderRegistration from "@/pages/FounderRegistration";
import InvestorRegistration from "@/pages/InvestorRegistration";
import NotFound from "@/pages/NotFound";

// Private Pages - Startup
import StartupDashboard from "@/pages/StartupDashboard";
import PitchStudio from "@/pages/PitchStudio";
import FinancialDataRoom from "@/pages/FinancialDataRoom";

// Private Pages - Investor
import InvestorDashboard from "@/pages/InvestorDashboard";
import InvestorDiscoveryFeed from "@/pages/InvestorDiscoveryFeed";
import DealRoom from "@/pages/DealRoom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UserProvider>
          <BrowserRouter>
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<Gateway />} />
              <Route path="/onboarding/startup" element={<FounderRegistration />} />
              <Route path="/onboarding/investor" element={<InvestorRegistration />} />

              {/* Protected Routes (Wrapped in Dashboard Layout) */}
              <Route element={<DashboardLayout />}>

                {/* Startup Views */}
                <Route path="/startup/dashboard" element={<StartupDashboard />} />
                <Route path="/startup/pitch" element={<PitchStudio />} />
                <Route path="/startup/financials" element={<FinancialDataRoom />} />

                {/* Investor Views */}
                <Route path="/investor/dashboard" element={<InvestorDashboard />} />
                <Route path="/investor/feed" element={<InvestorDiscoveryFeed />} />
                <Route path="/investor/deal-room/:id" element={<DealRoom />} />

              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
