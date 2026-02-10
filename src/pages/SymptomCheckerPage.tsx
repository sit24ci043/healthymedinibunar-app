import { motion } from "framer-motion";
import { Brain, Send, AlertTriangle, Bot, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  content: string;
}

const sampleResponses: Record<string, string> = {
  headache: "Based on your description of a **headache**, here are some possible causes:\n\n• **Tension headache** – most common, often related to stress\n• **Migraine** – if accompanied by nausea or light sensitivity\n• **Dehydration** – ensure adequate fluid intake\n\n**Suggested actions:** Rest, hydrate, and take OTC pain relief if needed. If persistent (>3 days) or severe, please consult a doctor.\n\n⚠️ *This is guidance only, not a medical diagnosis.*",
  fever: "Based on your description of **fever**, here are some considerations:\n\n• **Viral infection** – most common cause\n• **Bacterial infection** – may need antibiotics\n• **COVID-19** – consider testing if symptomatic\n\n**Suggested actions:** Rest, stay hydrated, monitor temperature. Seek medical help if fever exceeds 103°F or lasts more than 3 days.\n\n⚠️ *This is guidance only, not a medical diagnosis.*",
  cough: "Based on your description of a **cough**, here are possible causes:\n\n• **Common cold** – usually self-limiting\n• **Allergies** – seasonal or environmental triggers\n• **Bronchitis** – if persistent with mucus\n\n**Suggested actions:** Stay hydrated, use honey for soothing, avoid irritants. Consult a doctor if cough persists >2 weeks or includes blood.\n\n⚠️ *This is guidance only, not a medical diagnosis.*",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(sampleResponses)) {
    if (lower.includes(key)) return response;
  }
  return "Thank you for describing your symptoms. Based on the information provided, I recommend:\n\n• **Monitor your symptoms** for 24-48 hours\n• **Stay hydrated** and get adequate rest\n• **Consult a doctor** if symptoms worsen or persist\n\nCould you provide more details? For example:\n- When did symptoms start?\n- Any other symptoms?\n- Any medications you're taking?\n\n⚠️ *This is guidance only, not a medical diagnosis. Always consult a qualified healthcare professional.*";
};

const SymptomCheckerPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { role: "ai", content: getAIResponse(input) };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
            <Brain className="w-4 h-4 text-info" />
          </div>
          <h1 className="text-xl font-bold text-foreground">AI Symptom Checker</h1>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-2.5 mt-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              This tool provides <strong className="text-foreground">general health guidance only</strong>. 
              It is not a substitute for professional medical advice or diagnosis.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-info" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">How can I help?</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Describe your symptoms and I'll provide guided health insights.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["I have a headache", "I have a fever", "I have a cough"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); }}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-full bg-info/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-info" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ 
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }} />
              ) : (
                msg.content
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-info/10 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-info" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-gentle" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-gentle" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-gentle" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 bg-background border-t border-border">
        <div className="flex items-center gap-2 pt-3">
          <input
            type="text"
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 h-11 px-4 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="shrink-0 rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
