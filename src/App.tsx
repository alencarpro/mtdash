import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import OverviewPage from "./pages/dashboard/OverviewPage";
import EconomyPage from "./pages/dashboard/EconomyPage";
import SocialPage from "./pages/dashboard/SocialPage";
import EnvironmentPage from "./pages/dashboard/EnvironmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="dark">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="/dashboard/overview" element={<OverviewPage />} />
            <Route path="/dashboard/economy" element={<EconomyPage />} />
            <Route path="/dashboard/social" element={<SocialPage />} />
            <Route path="/dashboard/environment" element={<EnvironmentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
