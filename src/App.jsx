import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/HomePage";
import ExpensePage from "@/pages/ExpensePage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import "./App.css";

export const AlertContext = createContext();

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, title, description) => {
    setAlert({ type, title, description });
    setTimeout(() => setAlert(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <AlertContext.Provider value={showAlert}>
      <Router>
        <div className="flex min-h-screen relative">
          <SidebarProvider>
            <AppSidebar className="bg-background text-foreground" />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expenses" element={<ExpensePage />} />
              </Routes>
            </div>
          </SidebarProvider>

          {/* Global Alert */}
          {alert && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <Alert
                variant={alert.type}
                className="p-4 rounded-md shadow-md max-w-lg"
              >
                <AlertTitle className="font-medium">{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </Router>
    </AlertContext.Provider>
  );
}

export default App;
