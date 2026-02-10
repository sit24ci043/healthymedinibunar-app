import { motion } from "framer-motion";
import { 
  Phone, 
  Stethoscope, 
  Brain, 
  Calendar, 
  Pill, 
  AlertTriangle,
  ChevronRight,
  Star,
  Clock,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: Stethoscope, label: "Find Doctor", to: "/doctors", color: "bg-primary/10 text-primary" },
  { icon: Brain, label: "Symptom Check", to: "/symptoms", color: "bg-info/10 text-info" },
  { icon: Calendar, label: "Book Apt.", to: "/appointments", color: "bg-success/10 text-success" },
  { icon: Pill, label: "Medicines", to: "/medicines", color: "bg-warning/10 text-warning" },
];

const featuredDoctors = [
  { name: "Dr. Priya Sharma", specialty: "General Physician", rating: 4.9, exp: "12 yrs", available: true },
  { name: "Dr. Rajesh Kumar", specialty: "Cardiologist", rating: 4.8, exp: "18 yrs", available: true },
  { name: "Dr. Anitha Rao", specialty: "Dermatologist", rating: 4.7, exp: "8 yrs", available: false },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const HomePage = () => {
  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-sm text-muted-foreground">Good morning 👋</p>
          <h1 className="text-xl font-bold text-foreground">Medi-Nibunar</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-lg">🔔</span>
        </button>
      </motion.div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Link to="/emergency">
          <div className="gradient-emergency rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-card">
            <div className="w-12 h-12 rounded-full bg-emergency-foreground/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-emergency-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emergency-foreground text-sm">Emergency?</p>
              <p className="text-emergency-foreground/80 text-xs">Tap for quick access to nearby hospitals & helplines</p>
            </div>
            <ChevronRight className="w-5 h-5 text-emergency-foreground/60" />
          </div>
        </Link>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-3 mb-8"
      >
        {quickActions.map((action) => (
          <motion.div key={action.label} variants={item}>
            <Link to={action.to} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Symptom Checker CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-hero rounded-2xl p-5 mb-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wide">AI-Powered</span>
          </div>
          <h3 className="text-lg font-bold text-primary-foreground mb-1">Symptom Checker</h3>
          <p className="text-sm text-primary-foreground/70 mb-3">
            Describe your symptoms and get guided insights. Not a diagnosis.
          </p>
          <Link to="/symptoms">
            <Button variant="secondary" size="sm" className="font-semibold">
              Start Check →
            </Button>
          </Link>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-primary-foreground/5" />
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary-foreground/5" />
      </motion.div>

      {/* Featured Doctors */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Top Doctors</h2>
          <Link to="/doctors" className="text-sm text-primary font-medium">See all</Link>
        </div>

        <div className="space-y-3 mb-6">
          {featuredDoctors.map((doc) => (
            <Link key={doc.name} to="/doctors">
              <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3 border border-border/50">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-card-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-xs text-warning">
                      <Star className="w-3 h-3 fill-current" /> {doc.rating}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {doc.exp}
                    </span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-semibold ${doc.available ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {doc.available ? "Available" : "Busy"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Medical Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-info/5 border border-info/20 rounded-xl p-3 mb-6"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-info mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Medical Disclaimer:</strong> Medi-Nibunar provides health guidance only. 
            AI features do not replace professional medical advice. Always consult a qualified doctor for diagnosis and treatment.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
