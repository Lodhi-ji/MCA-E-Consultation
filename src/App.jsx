import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import EConsultationLanding from "./pages/EConsultationLanding";
import ConsultationListing from "./pages/ConsultationListing";
import FilteredConsultation from "./pages/FilteredConsultation";
import DocumentDetails from "./pages/DocumentDetails";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EConsultationLanding />} />
            <Route path="/consultation-listing" element={<ConsultationListing />} />
            <Route path="/filtered-consultation" element={<FilteredConsultation />} />
            <Route path="/document-details" element={<DocumentDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/demo" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;