import { motion } from "framer-motion";
import { ArrowLeft, Pill, Download, Eye, Calendar, User, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const prescriptions = [
  {
    id: 1, doctor: "Dr. Priya Sharma", date: "Feb 5, 2026", status: "active",
    medicines: [
      { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Twice daily", duration: "7 days" },
      { name: "Amoxicillin 250mg", dosage: "1 capsule", frequency: "Three times daily", duration: "5 days" },
    ],
    diagnosis: "Upper Respiratory Infection",
  },
  {
    id: 2, doctor: "Dr. Rajesh Kumar", date: "Jan 20, 2026", status: "active",
    medicines: [
      { name: "Vitamin D3 60000 IU", dosage: "1 sachet", frequency: "Once weekly", duration: "8 weeks" },
    ],
    diagnosis: "Vitamin D Deficiency",
  },
  {
    id: 3, doctor: "Dr. Anitha Rao", date: "Dec 15, 2025", status: "completed",
    medicines: [
      { name: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once daily", duration: "14 days" },
      { name: "Montelukast 10mg", dosage: "1 tablet", frequency: "Once daily", duration: "14 days" },
    ],
    diagnosis: "Allergic Rhinitis",
  },
  {
    id: 4, doctor: "Dr. Meera Gupta", date: "Nov 5, 2025", status: "completed",
    medicines: [
      { name: "Ibuprofen 400mg", dosage: "1 tablet", frequency: "As needed", duration: "5 days" },
    ],
    diagnosis: "Joint Pain",
  },
];

const PrescriptionsPage = () => {
  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Prescriptions</h1>
          <p className="text-xs text-muted-foreground">Digital prescriptions & history</p>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-primary/10 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-bold text-primary">2</p>
          <p className="text-xs text-muted-foreground mt-0.5">Active</p>
        </div>
        <div className="bg-secondary rounded-xl p-3.5 text-center">
          <p className="text-2xl font-bold text-foreground">4</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total</p>
        </div>
      </motion.div>

      <div className="space-y-4 mb-6">
        {prescriptions.map((rx, i) => (
          <motion.div key={rx.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
            className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {rx.doctor.split(" ").slice(1).map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{rx.doctor}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="w-3 h-3" />{rx.date}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium",
                        rx.status === "active" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                      )}>{rx.status === "active" ? "Active" : "Completed"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Download className="w-3.5 h-3.5 text-primary" /></button>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-2.5 mb-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Diagnosis</p>
                <p className="text-xs font-medium text-foreground">{rx.diagnosis}</p>
              </div>

              <div className="space-y-2">
                {rx.medicines.map((med, j) => (
                  <div key={j} className="flex items-center gap-2.5 py-1.5">
                    <Pill className="w-3.5 h-3.5 text-warning shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-card-foreground">{med.name}</p>
                      <p className="text-[10px] text-muted-foreground">{med.dosage} • {med.frequency} • {med.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <button className="w-full h-11 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground font-medium hover:border-primary/30 hover:text-primary transition-colors mb-6">
          + Upload Prescription
        </button>
      </motion.div>
    </div>
  );
};

export default PrescriptionsPage;
