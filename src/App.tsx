
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SharedPlaylist from "./pages/SharedPlaylist";
import Background from "./components/Background";
import React, { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { connectToDatabase } from "./services/mongodb/db";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  // Establish MongoDB connection when app starts
  useEffect(() => {
    const initDb = async () => {
      try {
        await connectToDatabase();
        console.log('MongoDB connection established');
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
      }
    };
    
    initDb();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Background>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app" element={<Index />} />
              <Route path="/shared/:id" element={<SharedPlaylist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </Background>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
