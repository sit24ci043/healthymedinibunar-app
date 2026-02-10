import { motion } from "framer-motion";
import { MessageSquare, Send, Phone, Video, MoreVertical } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    doctor: "Dr. Priya Sharma",
    specialty: "General Physician",
    lastMessage: "Take the prescribed medication twice daily after meals.",
    time: "2 min ago",
    unread: 2,
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    lastMessage: "Your test results look good. Keep up the exercise routine.",
    time: "1 hr ago",
    unread: 0,
  },
  {
    id: 3,
    doctor: "Dr. Suresh Patel",
    specialty: "Pediatrician",
    lastMessage: "The follow-up appointment is scheduled for next week.",
    time: "Yesterday",
    unread: 0,
  },
];

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const chatMessages = [
    { id: 1, from: "doctor", text: "Hello! How are you feeling today?", time: "2:15 PM" },
    { id: 2, from: "user", text: "Hi Doctor, I've been having mild headaches since yesterday.", time: "2:16 PM" },
    { id: 3, from: "doctor", text: "I see. Have you been staying hydrated? Also, are you experiencing any other symptoms like nausea or light sensitivity?", time: "2:17 PM" },
    { id: 4, from: "user", text: "No nausea, but a bit of eye strain from work.", time: "2:18 PM" },
    { id: 5, from: "doctor", text: "Take the prescribed medication twice daily after meals. Also, try to take regular breaks from screen time — the 20-20-20 rule helps.", time: "2:20 PM" },
  ];

  if (activeChat) {
    const conv = conversations.find((c) => c.id === activeChat);
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-3">
          <button onClick={() => setActiveChat(null)} className="text-muted-foreground text-sm">
            ← Back
          </button>
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
            {conv?.doctor.split(" ").slice(1).map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-card-foreground">{conv?.doctor}</p>
            <p className="text-[11px] text-success">Online</p>
          </div>
          <button className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
            <Video className="w-4 h-4 text-info" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div className="text-center">
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              🔒 Messages are end-to-end encrypted
            </span>
          </div>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                  msg.from === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-secondary-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 bg-background border-t border-border">
          <div className="flex items-center gap-2 pt-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
      </motion.div>

      <div className="space-y-2">
        {conversations.map((conv, i) => (
          <motion.button
            key={conv.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => setActiveChat(conv.id)}
            className="w-full bg-card rounded-xl p-4 shadow-card border border-border/50 flex items-center gap-3 text-left hover:bg-secondary/50 transition-colors"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {conv.doctor.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm text-card-foreground">{conv.doctor}</p>
                <span className="text-[10px] text-muted-foreground">{conv.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] text-primary-foreground font-bold">{conv.unread}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
