import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import ScanPage from "./pages/Scan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/warehouse-locations" element={<div className="p-8 text-center text-muted-foreground">Warehouse Locations coming soon...</div>} />
            <Route path="/shelf-creation" element={<div className="p-8 text-center text-muted-foreground">Shelf Creation coming soon...</div>} />
            <Route path="/warehouse-details" element={<div className="p-8 text-center text-muted-foreground">Warehouse Details coming soon...</div>} />
            <Route path="/user-settings" element={<div className="p-8 text-center text-muted-foreground">User Settings coming soon...</div>} />
            <Route path="/settings" element={<div className="p-8 text-center text-muted-foreground">System Settings coming soon...</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
