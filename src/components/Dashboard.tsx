import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Upload, 
  Eye, 
  Zap,
  Globe,
  Target,
  TrendingUp,
  Brain
} from 'lucide-react';
import { ThreatMap } from './ThreatMap';
import { AnalysisPanel } from './AnalysisPanel';
import { LiveFeed } from './LiveFeed';
import { RealityScore } from './RealityScore';

interface ThreatAlert {
  id: string;
  type: 'deepfake' | 'synthetic' | 'coordinated' | 'manipulation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: Date;
  realityScore: number;
  description: string;
}

export const Dashboard = () => {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [globalRealityScore, setGlobalRealityScore] = useState(73);
  const [activeThreats, setActiveThreats] = useState(156);
  const [processedToday, setProcessedToday] = useState(47230891);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update processed count
      setProcessedToday(prev => prev + Math.floor(Math.random() * 1000));
      
      // Occasionally add new threats
      if (Math.random() < 0.3) {
        const newThreat: ThreatAlert = {
          id: Date.now().toString(),
          type: ['deepfake', 'synthetic', 'coordinated', 'manipulation'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          source: ['Twitter/X', 'TikTok', 'YouTube', 'Facebook', 'Instagram', 'Telegram'][Math.floor(Math.random() * 6)],
          timestamp: new Date(),
          realityScore: Math.floor(Math.random() * 40) + 10,
          description: [
            'Synthetic face detected in viral video',
            'Coordinated bot network spreading false claims',
            'AI-generated voice mimicking public figure',
            'Deepfake video of political candidate',
            'Manipulated audio in news broadcast'
          ][Math.floor(Math.random() * 5)]
        };
        
        setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
        
        if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
          setActiveThreats(prev => prev + 1);
        }
      }
      
      // Fluctuate global reality score
      setGlobalRealityScore(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(60, Math.min(85, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive cyber-glow-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'deepfake': return <Eye className="h-4 w-4" />;
      case 'synthetic': return <Brain className="h-4 w-4" />;
      case 'coordinated': return <Target className="h-4 w-4" />;
      case 'manipulation': return <Zap className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen p-6 space-y-6 transition-all duration-300 ${emergencyMode ? 'bg-destructive/5' : ''}`}>
      {/* Demo Notice */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
        <p className="text-sm text-warning-foreground">
          🔬 <strong>DEMO MODE:</strong> This is a prototype interface. Live feeds are simulated. 
          Real implementation would connect to actual social media APIs and AI detection models.
        </p>
      </div>

      {/* Emergency Alert */}
      {emergencyMode && (
        <div className="bg-destructive/20 border border-destructive cyber-glow-danger rounded-lg p-4 animate-pulse-glow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h3 className="font-bold text-destructive">EMERGENCY MODE ACTIVATED</h3>
          </div>
          <p className="text-sm mt-2">All detection algorithms running at maximum sensitivity. Authorities notified.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={() => setEmergencyMode(false)}
          >
            Deactivate Emergency Mode
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DeepFake Detective
          </h1>
          <p className="text-muted-foreground">Real-Time Multimodal Disinformation Combat System</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="cyber-border hover:cyber-glow"
            onClick={() => setShowAnalysisModal(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Analyze Content
          </Button>
          <Button 
            className={`transition-all ${emergencyMode ? 'bg-destructive hover:bg-destructive/90 cyber-glow-danger' : 'bg-gradient-primary hover:shadow-glow-primary'}`}
            onClick={() => setEmergencyMode(!emergencyMode)}
          >
            <Shield className="h-4 w-4 mr-2" />
            {emergencyMode ? 'Emergency Active' : 'Emergency Mode'}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cyber-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Global Reality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{globalRealityScore}%</div>
            <RealityScore score={globalRealityScore} size="sm" />
          </CardContent>
        </Card>
        
        <Card className="cyber-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive animate-pulse-glow">{activeThreats}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{processedToday.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Activity className="h-4 w-4 mr-1" />
              50M+ daily capacity
            </div>
          </CardContent>
        </Card>
        
        <Card className="cyber-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">OPERATIONAL</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe className="h-4 w-4 mr-1" />
              15 platforms monitored
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Threat Map */}
        <div className="lg:col-span-2">
          <ThreatMap />
        </div>
        
        {/* Right Column - Live Feed */}
        <div>
          <Card className="cyber-border h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary animate-pulse" />
                Live Threat Feed (DEMO)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 overflow-y-auto max-h-[320px]">
              {threats.map((threat) => (
                <div key={threat.id} className="p-3 rounded-lg bg-muted/50 cyber-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {getThreatIcon(threat.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{threat.source}</span>
                        </div>
                        <p className="text-sm">{threat.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Reality Score:</span>
                          <RealityScore score={threat.realityScore} size="xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {threats.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active threats detected</p>
                  <p className="text-xs">System monitoring 15 platforms...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisPanel />
        <LiveFeed />
      </div>

      {/* Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card cyber-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Content Analysis</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAnalysisModal(false)}
              >
                ✕
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Paste URL or Text</label>
                <textarea 
                  className="w-full p-3 bg-muted rounded-lg border cyber-border" 
                  placeholder="Enter URL or paste suspicious content..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowAnalysisModal(false)}>
                  Analyze Content
                </Button>
                <Button variant="outline" onClick={() => setShowAnalysisModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};