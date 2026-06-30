import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SingleDashboard from "./pages/dashboard/SingleDashboard";
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
            <Route path="/" element={<Navigate to="/1" replace />} />
            <Route path="/t1" element={<SingleDashboard />} />
            <Route path="/t2" element={<SingleDashboard />} />
            <Route path="/t3" element={<SingleDashboard />} />
            <Route path="/t4" element={<SingleDashboard />} />
            <Route path="/:page" element={<SingleDashboard />} />
            <Route path="/dashboard/*" element={<Navigate to="/1" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
