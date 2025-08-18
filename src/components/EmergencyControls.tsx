import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Zap, Users, Globe, Lock } from "lucide-react";

interface EmergencyControlsProps {
  isEmergencyMode: boolean;
  onToggleEmergency: () => void;
}

export const EmergencyControls = ({ isEmergencyMode, onToggleEmergency }: EmergencyControlsProps) => {
  const [lockdownActive, setLockdownActive] = useState(false);
  const [counterActive, setCounterActive] = useState(false);

  const handleLockdown = () => {
    setLockdownActive(!lockdownActive);
    // In a real system, this would trigger content blocking
  };

  const handleCounter = () => {
    setCounterActive(!counterActive);
    // In a real system, this would deploy counter-narratives
  };

  if (!isEmergencyMode) return null;

  return (
    <Card className="border-destructive bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Emergency Response Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant={lockdownActive ? "destructive" : "outline"}
            onClick={handleLockdown}
            className="h-20 flex-col gap-2"
          >
            <Lock className="h-6 w-6" />
            <span>{lockdownActive ? "Lockdown Active" : "Content Lockdown"}</span>
          </Button>
          
          <Button
            variant={counterActive ? "default" : "outline"}
            onClick={handleCounter}
            className="h-20 flex-col gap-2"
          >
            <Shield className="h-6 w-6" />
            <span>{counterActive ? "Counter Active" : "Deploy Counter"}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => alert("Alert system activated - notifications sent to authorities")}
            className="h-20 flex-col gap-2"
          >
            <Zap className="h-6 w-6" />
            <span>Alert Authorities</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Response Team: {lockdownActive ? "Deployed" : "Standby"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>Global Coverage: {counterActive ? "Enhanced" : "Standard"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};