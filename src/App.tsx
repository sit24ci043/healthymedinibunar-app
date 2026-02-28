import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "./components/AppShell";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import SymptomCheckerPage from "./pages/SymptomCheckerPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import EmergencyPage from "./pages/EmergencyPage";
import MedicinesPage from "./pages/MedicinesPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import NotificationsPage from "./pages/NotificationsPage";
import LanguagePage from "./pages/LanguagePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedApp = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AppShell>{children}</AppShell>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedApp><HomePage /></ProtectedApp>} />
            <Route path="/doctors" element={<ProtectedApp><DoctorsPage /></ProtectedApp>} />
            <Route path="/symptoms" element={<ProtectedApp><SymptomCheckerPage /></ProtectedApp>} />
            <Route path="/appointments" element={<ProtectedApp><AppointmentsPage /></ProtectedApp>} />
            <Route path="/book-appointment" element={<ProtectedApp><BookAppointmentPage /></ProtectedApp>} />
            <Route path="/chat" element={<ProtectedApp><ChatPage /></ProtectedApp>} />
            <Route path="/profile" element={<ProtectedApp><ProfilePage /></ProtectedApp>} />
            <Route path="/emergency" element={<ProtectedApp><EmergencyPage /></ProtectedApp>} />
            <Route path="/medicines" element={<ProtectedApp><MedicinesPage /></ProtectedApp>} />
            <Route path="/medical-records" element={<ProtectedApp><MedicalRecordsPage /></ProtectedApp>} />
            <Route path="/prescriptions" element={<ProtectedApp><PrescriptionsPage /></ProtectedApp>} />
            <Route path="/notifications" element={<ProtectedApp><NotificationsPage /></ProtectedApp>} />
            <Route path="/language" element={<ProtectedApp><LanguagePage /></ProtectedApp>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
