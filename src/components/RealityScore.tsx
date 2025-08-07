import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface RealityScoreProps {
  score: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
}

export const RealityScore = ({ 
  score, 
  size = 'md', 
  showIcon = true, 
  showLabel = true 
}: RealityScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    if (score >= 40) return 'text-accent';
    return 'text-destructive';
  };

  const getScoreIcon = () => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-success" />;
    if (score >= 40) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <Shield className="h-4 w-4 text-destructive" />;
  };

  const getProgressColor = () => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    if (score >= 40) return 'bg-accent';
    return 'bg-destructive';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  };

  const getProgressHeight = () => {
    switch (size) {
      case 'xs': return 'h-1';
      case 'sm': return 'h-1.5';
      case 'md': return 'h-2';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  return (
    <div className={`space-y-1 ${getSizeClasses()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {showIcon && getScoreIcon()}
          {showLabel && (
            <span className="text-muted-foreground">
              {score >= 80 ? 'Authentic' : score >= 60 ? 'Likely Real' : score >= 40 ? 'Suspicious' : 'Likely Fake'}
            </span>
          )}
        </div>
        <span className={`font-mono font-bold ${getScoreColor()}`}>
          {score}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={score} 
          className={`${getProgressHeight()} bg-muted/30`}
        />
        <div 
          className={`absolute top-0 left-0 ${getProgressHeight()} ${getProgressColor()} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};