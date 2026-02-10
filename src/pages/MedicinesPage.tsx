import { motion } from "framer-motion";
import { Pill, Clock, Check, Bell, AlertCircle } from "lucide-react";

const medicines = [
  { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Twice daily (after meals)", doctor: "Dr. Priya Sharma", remaining: 14, nextDose: "2:00 PM", taken: false },
  { name: "Amoxicillin 250mg", dosage: "1 capsule", frequency: "Three times daily", doctor: "Dr. Priya Sharma", remaining: 7, nextDose: "1:00 PM", taken: true },
  { name: "Vitamin D3 60000 IU", dosage: "1 sachet", frequency: "Once weekly (Sunday)", doctor: "Dr. Rajesh Kumar", remaining: 4, nextDose: "Sunday", taken: false },
  { name: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once daily (at bedtime)", doctor: "Dr. Anitha Rao", remaining: 20, nextDose: "10:00 PM", taken: false },
];

const MedicinesPage = () => {
  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-foreground mb-1">My Medicines</h1>
        <p className="text-sm text-muted-foreground mb-4">Track dosages and set reminders</p>
      </motion.div>

      {/* Today's Summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="gradient-hero rounded-2xl p-4 mb-6"
      >
        <p className="text-sm text-primary-foreground/80">Today's Progress</p>
        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-3xl font-bold text-primary-foreground">1</span>
            <span className="text-primary-foreground/60 text-sm"> / 4 doses</span>
          </div>
          <div className="flex gap-1">
            {[true, false, false, false].map((done, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${done ? "bg-primary-foreground" : "bg-primary-foreground/20"}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Medicines List */}
      <div className="space-y-3">
        {medicines.map((med, i) => (
          <motion.div
            key={med.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className={`bg-card rounded-xl p-4 shadow-card border ${med.taken ? "border-success/30" : "border-border/50"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${med.taken ? "bg-success/10" : "bg-warning/10"}`}>
                {med.taken ? <Check className="w-5 h-5 text-success" /> : <Pill className="w-5 h-5 text-warning" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-card-foreground">{med.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{med.dosage} • {med.frequency}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Prescribed by {med.doctor}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> Next: {med.nextDose}
                  </span>
                  {med.remaining <= 7 && (
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="w-3 h-3" /> {med.remaining} left
                    </span>
                  )}
                </div>
              </div>
            </div>
            {!med.taken && (
              <button className="w-full mt-3 h-9 rounded-lg bg-success/10 text-success text-sm font-semibold hover:bg-success/15 transition-colors flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Mark as Taken
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 mb-6"
      >
        <button className="w-full h-11 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground font-medium hover:border-primary/30 hover:text-primary transition-colors">
          + Upload Prescription
        </button>
      </motion.div>
    </div>
  );
};

export default MedicinesPage;
