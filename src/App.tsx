
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SharedPlaylist from "./pages/SharedPlaylist";
import Background from "./components/Background";
import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { connectToDatabase } from "./services/mongodb/db";
import { toast } from "sonner";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [dbReady, setDbReady] = useState(false);
  
  // Establish MongoDB connection when app starts
  useEffect(() => {
    const initDb = async () => {
      try {
        // MongoDB connection is not working properly in the browser environment
        // This is expected since we can't connect directly to MongoDB from the browser
        // For production, we would need a backend API or serverless functions
        // For now, we'll mock the connection
        // await connectToDatabase();
        console.log('Simulating MongoDB connection');
        setDbReady(true);
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        toast.error("Database connection failed", {
          description: "Using local storage for persistence instead",
        });
        // Still set to true to allow app to function even if DB fails
        setDbReady(true);
      }
    };
    
    initDb();
  }, []);

  if (!dbReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg">Connecting to database...</p>
        </div>
      </div>
    );
  }

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
