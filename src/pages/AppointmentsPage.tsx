import { motion } from "framer-motion";
import { Calendar, Video, MessageSquare, Clock, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = ["Upcoming", "Past", "Cancelled"];

const appointments = [
  { id: 1, doctor: "Dr. Priya Sharma", specialty: "General Physician", date: "Today", time: "2:30 PM", type: "video", status: "upcoming" },
  { id: 2, doctor: "Dr. Rajesh Kumar", specialty: "Cardiologist", date: "Tomorrow", time: "11:00 AM", type: "chat", status: "upcoming" },
  { id: 3, doctor: "Dr. Suresh Patel", specialty: "Pediatrician", date: "Feb 5, 2026", time: "9:00 AM", type: "video", status: "past" },
  { id: 4, doctor: "Dr. Meera Gupta", specialty: "Orthopedic", date: "Jan 28, 2026", time: "3:00 PM", type: "video", status: "cancelled" },
];

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filtered = appointments.filter((a) => a.status === activeTab.toLowerCase());

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-foreground">My Appointments</h1>
        <Link to="/book-appointment"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Book
        </Link>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex bg-secondary rounded-xl p-1 mb-6"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Appointment Cards */}
      <div className="space-y-3">
        {filtered.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card border border-border/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                  {apt.doctor.split(" ").slice(1).map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{apt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${apt.type === "video" ? "bg-info/10" : "bg-success/10"}`}>
                {apt.type === "video" ? (
                  <Video className={`w-4 h-4 text-info`} />
                ) : (
                  <MessageSquare className={`w-4 h-4 text-success`} />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {apt.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {apt.time}
              </span>
            </div>
            {apt.status === "upcoming" && (
              <div className="flex gap-2 mt-3">
                <button className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                  {apt.type === "video" ? "Join Call" : "Open Chat"}
                </button>
                <button className="px-4 h-9 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/15 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No {activeTab.toLowerCase()} appointments</p>
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentsPage;
