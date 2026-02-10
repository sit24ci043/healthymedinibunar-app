import { motion } from "framer-motion";
import {
  User, FileText, Bell, Shield, Globe, Accessibility, LogOut,
  ChevronRight, Heart, Pill, Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Calendar, label: "Appointments", value: "12", color: "bg-primary/10 text-primary" },
  { icon: Pill, label: "Prescriptions", value: "8", color: "bg-info/10 text-info" },
  { icon: Heart, label: "Health Score", value: "85%", color: "bg-success/10 text-success" },
];

const menuItems = [
  { icon: FileText, label: "Medical Records", desc: "View your health history", to: "/medical-records" },
  { icon: Pill, label: "Prescriptions", desc: "Digital prescriptions & reminders", to: "/prescriptions" },
  { icon: Bell, label: "Notifications", desc: "Manage alerts & reminders", to: "/notifications" },
  { icon: Globe, label: "Language", desc: "English • हिन्दी • தமிழ் • తెలుగు", to: "/language" },
  { icon: Accessibility, label: "Accessibility", desc: "Large text, voice input", to: "/profile" },
  { icon: Shield, label: "Privacy & Security", desc: "Data sharing & consent", to: "/profile" },
];

const ProfilePage = () => {
  return (
    <div className="px-4 pt-6">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold text-foreground">Guest User</h1>
        <p className="text-sm text-muted-foreground">Sign in for personalized care</p>
        <button className="mt-3 px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          Sign In / Register
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-3 shadow-card border border-border/50 text-center">
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Menu */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-1.5 mb-6">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-muted-foreground mt-4 mb-6">
        Medi-Nibunar v1.0 • HIPAA Compliant
      </p>
    </div>
  );
};

export default ProfilePage;
