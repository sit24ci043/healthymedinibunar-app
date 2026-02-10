import { motion } from "framer-motion";
import { Bell, Calendar, Pill, MessageSquare, ArrowLeft, Check, Trash2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: "appointment" | "medicine" | "chat" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, type: "appointment", title: "Upcoming Appointment", message: "Video call with Dr. Priya Sharma at 2:30 PM today", time: "30 min ago", read: false },
  { id: 2, type: "medicine", title: "Medicine Reminder", message: "Time to take Paracetamol 500mg (1 tablet)", time: "1 hr ago", read: false },
  { id: 3, type: "chat", title: "New Message", message: "Dr. Rajesh Kumar sent you a message about your report", time: "2 hrs ago", read: false },
  { id: 4, type: "system", title: "Lab Results Ready", message: "Your CBC blood test results are now available", time: "5 hrs ago", read: true },
  { id: 5, type: "appointment", title: "Appointment Confirmed", message: "Appointment with Dr. Rajesh Kumar on Feb 11 at 11:00 AM", time: "Yesterday", read: true },
  { id: 6, type: "medicine", title: "Prescription Expiring", message: "Amoxicillin prescription expires in 3 days. Contact your doctor.", time: "Yesterday", read: true },
  { id: 7, type: "system", title: "Health Tip", message: "Stay hydrated! Drink at least 8 glasses of water daily.", time: "2 days ago", read: true },
];

const iconMap = {
  appointment: { icon: Calendar, color: "bg-primary/10 text-primary" },
  medicine: { icon: Pill, color: "bg-warning/10 text-warning" },
  chat: { icon: MessageSquare, color: "bg-success/10 text-success" },
  system: { icon: AlertCircle, color: "bg-info/10 text-info" },
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Mark all read
          </button>
        )}
      </motion.div>

      <div className="space-y-2 mb-6">
        {notifications.map((notif, i) => {
          const { icon: Icon, color } = iconMap[notif.type];
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className={cn("bg-card rounded-xl p-3.5 shadow-card border flex items-start gap-3 relative",
                notif.read ? "border-border/50" : "border-primary/30 bg-primary/[0.02]"
              )}
              onClick={() => markRead(notif.id)}
            >
              {!notif.read && <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-primary" />}
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{notif.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1.5">{notif.time}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors shrink-0">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No notifications</p>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationsPage;
