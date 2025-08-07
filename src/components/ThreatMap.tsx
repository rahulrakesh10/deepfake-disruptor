import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, AlertTriangle, Shield } from 'lucide-react';

interface ThreatLocation {
  id: string;
  country: string;
  x: number;
  y: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  count: number;
}

export const ThreatMap = () => {
  const [threats, setThreats] = useState<ThreatLocation[]>([
    { id: '1', country: 'United States', x: 25, y: 35, severity: 'high', type: 'Deepfake', count: 23 },
    { id: '2', country: 'China', x: 75, y: 40, severity: 'critical', type: 'Coordinated', count: 45 },
    { id: '3', country: 'Russia', x: 65, y: 25, severity: 'critical', type: 'Synthetic', count: 67 },
    { id: '4', country: 'Brazil', x: 35, y: 70, severity: 'medium', type: 'Manipulation', count: 12 },
    { id: '5', country: 'India', x: 72, y: 45, severity: 'high', type: 'Deepfake', count: 34 },
    { id: '6', country: 'Germany', x: 52, y: 30, severity: 'medium', type: 'Synthetic', count: 8 },
    { id: '7', country: 'Australia', x: 82, y: 75, severity: 'low', type: 'Manipulation', count: 5 },
  ]);

  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        count: threat.count + Math.floor(Math.random() * 3),
        severity: Math.random() < 0.1 ? 
          (['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any) : 
          threat.severity
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive animate-pulse-glow';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case 'critical': return 'w-4 h-4';
      case 'high': return 'w-3 h-3';
      case 'medium': return 'w-2 h-2';
      case 'low': return 'w-1.5 h-1.5';
      default: return 'w-2 h-2';
    }
  };

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Global Disinformation Weather Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gradient-to-br from-muted/20 to-background rounded-lg overflow-hidden">
          {/* World Map Background */}
          <div className="relative w-full h-[300px] bg-gradient-to-br from-primary/5 to-secondary/5">
            {/* Simple world map representation */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                {/* Simplified continent shapes */}
                <path d="M15,20 L35,18 L40,25 L35,35 L20,40 L10,35 Z" fill="currentColor" opacity="0.3" />
                <path d="M45,15 L75,12 L85,20 L80,35 L70,40 L50,38 L45,25 Z" fill="currentColor" opacity="0.3" />
                <path d="M20,45 L40,42 L45,50 L35,55 L25,52 Z" fill="currentColor" opacity="0.3" />
                <path d="M75,45 L90,43 L95,50 L88,55 L78,53 Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>

            {/* Threat Markers */}
            {threats.map((threat) => (
              <div
                key={threat.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ${getSeverityColor(threat.severity)} ${getSeveritySize(threat.severity)} transition-all hover:scale-150`}
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className={`w-full h-full rounded-full ${threat.severity === 'critical' ? 'animate-ping' : ''}`} />
              </div>
            ))}

            {/* Data Flow Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {threats.map((threat, index) => (
                <div
                  key={`flow-${threat.id}`}
                  className="absolute h-px bg-gradient-to-r from-primary/30 to-transparent animate-data-flow"
                  style={{
                    left: `${threat.x}%`,
                    top: `${threat.y}%`,
                    width: '20%',
                    animationDelay: `${index * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse-glow" />
              <span>Critical Threat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>Low Risk</span>
            </div>
          </div>

          {/* Selected Threat Details */}
          {selectedThreat && (
            <div className="mt-4 p-4 bg-card cyber-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{selectedThreat.country}</h4>
                <Badge variant="outline" className={getSeverityColor(selectedThreat.severity)}>
                  {selectedThreat.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Threat Type:</span>
                  <p className="font-medium">{selectedThreat.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Active Cases:</span>
                  <p className="font-medium">{selectedThreat.count}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};