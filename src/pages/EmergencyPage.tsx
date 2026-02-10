import { motion } from "framer-motion";
import { Phone, MapPin, AlertTriangle, Heart, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";

const emergencyNumbers = [
  { label: "Ambulance", number: "108", icon: Ambulance },
  { label: "Emergency", number: "112", icon: Phone },
  { label: "Health Helpline", number: "104", icon: Heart },
];

const nearbyHospitals = [
  { name: "Apollo Hospital", distance: "1.2 km", address: "MG Road, Bangalore", type: "Multi-specialty", emergency: true },
  { name: "Fortis Healthcare", distance: "2.5 km", address: "Bannerghatta Road", type: "Multi-specialty", emergency: true },
  { name: "Manipal Hospital", distance: "3.8 km", address: "Old Airport Road", type: "Super-specialty", emergency: true },
  { name: "Community Health Center", distance: "0.8 km", address: "Jayanagar 4th Block", type: "Primary Care", emergency: false },
];

const EmergencyPage = () => {
  return (
    <div className="px-4 pt-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-emergency" />
          <h1 className="text-xl font-bold text-foreground">Emergency</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Quick access to emergency services & nearby hospitals</p>
      </motion.div>

      {/* Emergency Call Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-3 mb-8"
      >
        {emergencyNumbers.map((item) => (
          <a
            key={item.number}
            href={`tel:${item.number}`}
            className="flex items-center gap-4 p-4 rounded-xl gradient-emergency shadow-card"
          >
            <div className="w-12 h-12 rounded-full bg-emergency-foreground/20 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-emergency-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-emergency-foreground">{item.label}</p>
              <p className="text-sm text-emergency-foreground/80">Tap to call</p>
            </div>
            <span className="text-2xl font-bold text-emergency-foreground">{item.number}</span>
          </a>
        ))}
      </motion.div>

      {/* Nearby Hospitals */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Nearby Hospitals
        </h2>
        <div className="space-y-3">
          {nearbyHospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="bg-card rounded-xl p-4 shadow-card border border-border/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{hospital.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{hospital.type}</p>
                  <p className="text-xs text-muted-foreground">{hospital.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">{hospital.distance}</span>
                  {hospital.emergency && (
                    <p className="text-[10px] text-emergency font-medium mt-0.5">24/7 Emergency</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="default" size="sm" className="flex-1 text-xs">
                  <MapPin className="w-3 h-3 mr-1" /> Directions
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Phone className="w-3 h-3 mr-1" /> Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyPage;
