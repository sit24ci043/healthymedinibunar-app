import { motion } from "framer-motion";
import { Search, Star, Clock, Filter, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const specialties = ["All", "General", "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology"];

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "General Physician", rating: 4.9, reviews: 342, exp: "12 yrs", fee: "₹500", location: "Mumbai", available: true, slots: "10:00 AM, 2:30 PM" },
  { id: 2, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", rating: 4.8, reviews: 287, exp: "18 yrs", fee: "₹800", location: "Delhi", available: true, slots: "11:00 AM, 4:00 PM" },
  { id: 3, name: "Dr. Anitha Rao", specialty: "Dermatologist", rating: 4.7, reviews: 198, exp: "8 yrs", fee: "₹600", location: "Bangalore", available: false, slots: "" },
  { id: 4, name: "Dr. Suresh Patel", specialty: "Pediatrician", rating: 4.9, reviews: 456, exp: "15 yrs", fee: "₹550", location: "Chennai", available: true, slots: "9:00 AM, 1:00 PM" },
  { id: 5, name: "Dr. Meera Gupta", specialty: "Orthopedic", rating: 4.6, reviews: 178, exp: "10 yrs", fee: "₹700", location: "Hyderabad", available: true, slots: "3:00 PM, 5:30 PM" },
  { id: 6, name: "Dr. Arun Nair", specialty: "Neurologist", rating: 4.8, reviews: 234, exp: "20 yrs", fee: "₹1000", location: "Kochi", available: true, slots: "10:30 AM" },
];

const DoctorsPage = () => {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const filtered = doctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = activeSpecialty === "All" || d.specialty.toLowerCase().includes(activeSpecialty.toLowerCase());
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-foreground mb-4">Find Doctors</h1>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-4"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2">
          <Filter className="w-4 h-4 text-muted-foreground" />
        </button>
      </motion.div>

      {/* Specialty Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide"
      >
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setActiveSpecialty(spec)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200",
              activeSpecialty === spec
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {spec}
          </button>
        ))}
      </motion.div>

      {/* Doctor Cards */}
      <div className="space-y-3">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card border border-border/50"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-card-foreground">{doc.name}</p>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${doc.available ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {doc.available ? "Available" : "Busy"}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{doc.specialty}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-0.5 text-xs text-warning">
                    <Star className="w-3 h-3 fill-current" /> {doc.rating} ({doc.reviews})
                  </span>
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {doc.exp}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {doc.location}
                  </span>
                </div>
                {doc.available && doc.slots && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Next: <span className="text-foreground font-medium">{doc.slots.split(",")[0]}</span></p>
                    <p className="text-sm font-bold text-primary">{doc.fee}</p>
                  </div>
                )}
              </div>
            </div>
            {doc.available && (
              <button className="w-full mt-3 h-9 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/15 transition-colors">
                Book Appointment
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No doctors found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
