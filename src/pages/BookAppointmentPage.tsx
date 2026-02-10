import { motion } from "framer-motion";
import { ArrowLeft, Video, MessageSquare, Calendar, Clock, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "General Physician", rating: 4.9, fee: "₹300", avatar: "PS" },
  { id: 2, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", rating: 4.8, fee: "₹500", avatar: "RK" },
  { id: 3, name: "Dr. Anitha Rao", specialty: "Dermatologist", rating: 4.7, fee: "₹400", avatar: "AR" },
  { id: 4, name: "Dr. Suresh Patel", specialty: "Pediatrician", rating: 4.6, fee: "₹350", avatar: "SP" },
  { id: 5, name: "Dr. Meera Gupta", specialty: "Orthopedic", rating: 4.5, fee: "₹450", avatar: "MG" },
];

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      date: d.getDate(),
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      month: d.toLocaleDateString('en', { month: 'short' }),
      full: d.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }),
      isToday: i === 0,
    });
  }
  return days;
};

const BookAppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [consultType, setConsultType] = useState<"video" | "chat">("video");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const { toast } = useToast();

  const days = getNextDays();
  const doctor = doctors.find(d => d.id === selectedDoctor);

  const handleBook = () => {
    setBooked(true);
    toast({ title: "Appointment Booked! ✅", description: `${consultType === "video" ? "Video" : "Chat"} consultation with ${doctor?.name} on ${days[selectedDate].full} at ${selectedTime}` });
  };

  if (booked) {
    return (
      <div className="px-4 pt-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-sm text-muted-foreground mb-1">{doctor?.name} • {doctor?.specialty}</p>
          <p className="text-sm text-muted-foreground mb-1">{days[selectedDate].full} at {selectedTime}</p>
          <p className="text-sm text-muted-foreground mb-6">{consultType === "video" ? "📹 Video Call" : "💬 Chat"} • {doctor?.fee}</p>
          <div className="flex gap-3">
            <Link to="/appointments" className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-opacity">
              View Appointments
            </Link>
            <Link to="/" className="flex-1 h-11 rounded-xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center hover:bg-secondary/80 transition-colors">
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
        <Link to={step === 1 ? "/appointments" : "#"} onClick={(e) => { if (step > 1) { e.preventDefault(); setStep(step - 1); } }}
          className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>
      </motion.div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={cn("h-1 flex-1 rounded-full transition-colors", s <= step ? "bg-primary" : "bg-secondary")} />
        ))}
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-semibold text-foreground mb-3">Select Doctor</p>
          <div className="space-y-2.5 mb-6">
            {doctors.map(doc => (
              <button key={doc.id} onClick={() => setSelectedDoctor(doc.id)}
                className={cn("w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left",
                  selectedDoctor === doc.id ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border/50 bg-card"
                )}>
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                  {doc.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-card-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-xs text-warning"><Star className="w-3 h-3 fill-current" /> {doc.rating}</span>
                    <span className="text-xs text-primary font-semibold">{doc.fee}</span>
                  </div>
                </div>
                {selectedDoctor === doc.id && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-3.5 h-3.5 text-primary-foreground" /></div>}
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold text-foreground mb-3">Consultation Type</p>
          <div className="flex gap-3 mb-6">
            {([{ type: "video" as const, icon: Video, label: "Video Call" }, { type: "chat" as const, icon: MessageSquare, label: "Chat" }]).map(ct => (
              <button key={ct.type} onClick={() => setConsultType(ct.type)}
                className={cn("flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all",
                  consultType === ct.type ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card"
                )}>
                <ct.icon className={cn("w-5 h-5", consultType === ct.type ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", consultType === ct.type ? "text-primary" : "text-muted-foreground")}>{ct.label}</span>
              </button>
            ))}
          </div>

          <button disabled={!selectedDoctor} onClick={() => setStep(2)}
            className={cn("w-full h-12 rounded-xl font-semibold text-sm transition-opacity",
              selectedDoctor ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}>
            Continue
          </button>
        </motion.div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-sm font-semibold text-foreground mb-3">Select Date</p>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {days.map((day, i) => (
              <button key={i} onClick={() => setSelectedDate(i)}
                className={cn("flex flex-col items-center min-w-[56px] py-3 px-2 rounded-xl border transition-all",
                  selectedDate === i ? "border-primary bg-primary text-primary-foreground" : "border-border/50 bg-card"
                )}>
                <span className="text-[10px] font-medium">{day.day}</span>
                <span className="text-lg font-bold">{day.date}</span>
                <span className="text-[10px]">{day.month}</span>
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold text-foreground mb-3">Select Time</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {timeSlots.map(time => (
              <button key={time} onClick={() => setSelectedTime(time)}
                className={cn("py-2.5 rounded-xl border text-sm font-medium transition-all",
                  selectedTime === time ? "border-primary bg-primary text-primary-foreground" : "border-border/50 bg-card text-foreground hover:border-primary/30"
                )}>
                {time}
              </button>
            ))}
          </div>

          <button disabled={!selectedTime} onClick={() => setStep(3)}
            className={cn("w-full h-12 rounded-xl font-semibold text-sm transition-opacity",
              selectedTime ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}>
            Continue
          </button>
        </motion.div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && doctor && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border/50 mb-6">
            <p className="text-sm font-semibold text-foreground mb-4">Booking Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Doctor</span><span className="text-sm font-medium text-foreground">{doctor.name}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Specialty</span><span className="text-sm text-foreground">{doctor.specialty}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Type</span><span className="text-sm text-foreground">{consultType === "video" ? "📹 Video Call" : "💬 Chat"}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Date</span><span className="text-sm text-foreground">{days[selectedDate].full}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Time</span><span className="text-sm text-foreground">{selectedTime}</span></div>
              <div className="border-t border-border pt-3 flex justify-between"><span className="text-sm font-semibold text-foreground">Fee</span><span className="text-lg font-bold text-primary">{doctor.fee}</span></div>
            </div>
          </div>

          <button onClick={handleBook}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
            Confirm & Book
          </button>

          <p className="text-center text-[10px] text-muted-foreground mt-4 mb-6">
            By booking, you agree to the cancellation policy. Cancel up to 2 hours before for a full refund.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BookAppointmentPage;
