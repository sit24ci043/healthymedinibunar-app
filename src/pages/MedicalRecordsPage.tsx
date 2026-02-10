import { motion } from "framer-motion";
import { 
  FileText, ChevronRight, Download, Calendar, 
  Activity, Droplets, Heart, ArrowLeft, Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Reports", "Lab Results", "Vitals"];

const reports = [
  { id: 1, title: "General Health Checkup", doctor: "Dr. Priya Sharma", date: "Jan 15, 2026", type: "Checkup", status: "completed" },
  { id: 2, title: "Blood Test - CBC", doctor: "Dr. Rajesh Kumar", date: "Dec 20, 2025", type: "Lab", status: "completed" },
  { id: 3, title: "Chest X-Ray Report", doctor: "Dr. Anitha Rao", date: "Nov 10, 2025", type: "Imaging", status: "completed" },
  { id: 4, title: "ECG Report", doctor: "Dr. Rajesh Kumar", date: "Oct 5, 2025", type: "Cardiology", status: "completed" },
  { id: 5, title: "Thyroid Panel", doctor: "Dr. Meera Gupta", date: "Sep 18, 2025", type: "Lab", status: "completed" },
];

const labResults = [
  { test: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", status: "normal" },
  { test: "Blood Sugar (Fasting)", value: "98", unit: "mg/dL", range: "70-100", status: "normal" },
  { test: "Cholesterol (Total)", value: "215", unit: "mg/dL", range: "<200", status: "high" },
  { test: "Vitamin D", value: "18", unit: "ng/mL", range: "30-100", status: "low" },
  { test: "TSH", value: "3.2", unit: "mIU/L", range: "0.4-4.0", status: "normal" },
  { test: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.7-1.3", status: "normal" },
];

const vitals = [
  { icon: Heart, label: "Blood Pressure", value: "120/80", unit: "mmHg", trend: "stable", date: "Feb 8, 2026" },
  { icon: Activity, label: "Heart Rate", value: "72", unit: "bpm", trend: "stable", date: "Feb 8, 2026" },
  { icon: Droplets, label: "Blood Sugar", value: "98", unit: "mg/dL", trend: "down", date: "Feb 7, 2026" },
  { icon: Activity, label: "SpO2", value: "98", unit: "%", trend: "stable", date: "Feb 8, 2026" },
  { icon: Activity, label: "BMI", value: "23.5", unit: "kg/m²", trend: "stable", date: "Feb 1, 2026" },
];

const MedicalRecordsPage = () => {
  const [activeTab, setActiveTab] = useState("Reports");

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Medical Records</h1>
          <p className="text-xs text-muted-foreground">Your complete health history</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex bg-secondary rounded-xl p-1 mb-5">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            )}>
            {tab}
          </button>
        ))}
      </motion.div>

      {activeTab === "Reports" && (
        <div className="space-y-3 mb-6">
          {reports.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              className="bg-card rounded-xl p-4 shadow-card border border-border/50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-card-foreground">{report.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{report.doctor}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {report.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-info/10 text-info text-[10px] font-medium">{report.type}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/15 transition-colors">
                    <Download className="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "Lab Results" && (
        <div className="space-y-2.5 mb-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground mb-3">
            Latest results from Dec 20, 2025
          </motion.p>
          {labResults.map((result, i) => (
            <motion.div key={result.test} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              className="bg-card rounded-xl p-3.5 shadow-card border border-border/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">{result.test}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Range: {result.range} {result.unit}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-lg font-bold",
                  result.status === "normal" ? "text-success" : result.status === "high" ? "text-warning" : "text-destructive"
                )}>
                  {result.value}
                </p>
                <p className="text-[10px] text-muted-foreground">{result.unit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "Vitals" && (
        <div className="space-y-3 mb-6">
          {vitals.map((vital, i) => (
            <motion.div key={vital.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              className="bg-card rounded-xl p-4 shadow-card border border-border/50 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <vital.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{vital.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Last: {vital.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{vital.value}</p>
                <p className="text-[10px] text-muted-foreground">{vital.unit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;
