import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 pt-6">
      <Link to="/login" className="flex items-center gap-1 text-sm text-primary font-medium mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Login
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4">
          <Heart className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">Reset Password</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send a reset link.</p>

        {sent ? (
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
            <p className="text-sm text-foreground font-medium mb-1">Email Sent! ✉️</p>
            <p className="text-xs text-muted-foreground">Check your inbox for the password reset link.</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" />
              </div>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full h-12 rounded-xl" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
