
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
import { toast } from "sonner";
import { supabase } from "./integrations/supabase/client";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [dbReady, setDbReady] = useState(false);
  
  // Check Supabase connection when app starts
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Use type assertion to avoid TypeScript errors
        const { error } = await (supabase.from('movies') as any).select('id').limit(1);
        
        if (error) {
          console.error('Failed to connect to Supabase:', error);
          toast.error("Database connection failed", {
            description: "Using local storage for persistence instead",
          });
        } else {
          console.log('Connected to Supabase successfully');
          toast.success("Connected to Supabase", {
            description: "Your app data will be stored and retrieved from the cloud",
          });
        }
        
        // Set to true either way so the app continues to function
        setDbReady(true);
      } catch (error) {
        console.error('Failed to connect to database:', error);
        toast.error("Database connection failed", {
          description: "Using local storage for persistence instead",
        });
        // Still set to true to allow app to function
        setDbReady(true);
      }
    };
    
    checkConnection();
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
