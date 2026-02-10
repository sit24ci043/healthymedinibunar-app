import { motion } from "framer-motion";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇮🇳" },
];

const LanguagePage = () => {
  const [selected, setSelected] = useState("en");

  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
        <Link to="/profile" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Language</h1>
          <p className="text-xs text-muted-foreground">Choose your preferred language</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="gradient-hero rounded-2xl p-4 mb-6 flex items-center gap-3">
        <Globe className="w-8 h-8 text-primary-foreground" />
        <div>
          <p className="text-sm font-semibold text-primary-foreground">Multilingual Support</p>
          <p className="text-xs text-primary-foreground/70">All features available in your language</p>
        </div>
      </motion.div>

      <div className="space-y-2 mb-6">
        {languages.map((lang, i) => (
          <motion.button key={lang.code} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.03 }}
            onClick={() => setSelected(lang.code)}
            className={cn("w-full flex items-center gap-3 p-3.5 rounded-xl transition-all border",
              selected === lang.code
                ? "bg-primary/5 border-primary/30 shadow-sm"
                : "bg-card border-border/50 hover:bg-secondary"
            )}>
            <span className="text-2xl">{lang.flag}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{lang.name}</p>
              <p className="text-xs text-muted-foreground">{lang.native}</p>
            </div>
            {selected === lang.code && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
          Save Language Preference
        </button>
      </motion.div>

      <p className="text-center text-[10px] text-muted-foreground mt-4 mb-6">
        Some features may have limited translation support
      </p>
    </div>
  );
};

export default LanguagePage;
