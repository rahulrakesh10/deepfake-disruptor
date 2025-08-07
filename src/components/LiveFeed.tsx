import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Radio, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Heart,
  Repeat2,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface LivePost {
  id: string;
  platform: string;
  content: string;
  author: string;
  engagement: number;
  realityScore: number;
  viralPrediction: number;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  metrics: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export const LiveFeed = () => {
  const [posts, setPosts] = useState<LivePost[]>([]);
  const [streamStatus, setStreamStatus] = useState<'connected' | 'disconnected'>('connected');

  useEffect(() => {
    // Simulate live stream of social media posts
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const platforms = ['Twitter/X', 'TikTok', 'Instagram', 'YouTube', 'Facebook', 'Telegram'];
        const authors = ['@newsaccount', '@politicaltalk', '@breakingnews', '@viral_content', '@celebrity_news'];
        const contents = [
          'BREAKING: New footage emerges from recent political event...',
          'Celebrity spotted in compromising situation - watch full video',
          'Government official makes shocking statement about economy',
          'VIRAL: Amazing rescue caught on camera goes worldwide',
          'EXCLUSIVE: Leaked audio reveals shocking conversation',
          'URGENT: Emergency services respond to developing situation'
        ];

        const realityScore = Math.floor(Math.random() * 80) + 20;
        const viralPrediction = Math.floor(Math.random() * 100);
        
        const newPost: LivePost = {
          id: Date.now().toString(),
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          content: contents[Math.floor(Math.random() * contents.length)],
          author: authors[Math.floor(Math.random() * authors.length)],
          engagement: Math.floor(Math.random() * 10000) + 1000,
          realityScore,
          viralPrediction,
          timestamp: new Date(),
          riskLevel: realityScore < 40 ? 'critical' : realityScore < 60 ? 'high' : realityScore < 75 ? 'medium' : 'low',
          metrics: {
            likes: Math.floor(Math.random() * 5000) + 100,
            shares: Math.floor(Math.random() * 1000) + 50,
            comments: Math.floor(Math.random() * 500) + 25
          }
        };

        setPosts(prev => [newPost, ...prev.slice(0, 9)]);
      }
    }, 2000);

    // Simulate occasional disconnections
    const statusInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setStreamStatus('disconnected');
        setTimeout(() => setStreamStatus('connected'), 2000);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-destructive cyber-glow-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getPlatformIcon = (platform: string) => {
    // In a real app, you'd use actual platform icons
    return <MessageSquare className="h-4 w-4" />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className={`h-5 w-5 ${streamStatus === 'connected' ? 'text-success animate-pulse' : 'text-destructive'}`} />
            Live Social Stream
          </div>
          <Badge variant="outline" className={streamStatus === 'connected' ? 'bg-success/20' : 'bg-destructive/20'}>
            {streamStatus.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="p-3 bg-muted/50 rounded-lg cyber-border space-y-2 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getPlatformIcon(post.platform)}
                <span className="text-sm font-medium">{post.platform}</span>
                <span className="text-xs text-muted-foreground">{post.author}</span>
              </div>
              <Badge variant="outline" className={`text-xs ${getRiskColor(post.riskLevel)}`}>
                {post.riskLevel.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-sm text-foreground/90 line-clamp-2">{post.content}</p>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Reality Score:</span>
                <div className="flex items-center gap-2">
                  <Progress value={post.realityScore} className="h-1.5 flex-1" />
                  <span className="font-mono">{post.realityScore}%</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Viral Risk:</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={post.viralPrediction} 
                    className="h-1.5 flex-1"
                  />
                  <span className="font-mono">{post.viralPrediction}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {formatNumber(post.metrics.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <Repeat2 className="h-3 w-3" />
                  {formatNumber(post.metrics.shares)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {formatNumber(post.metrics.comments)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{post.timestamp.toLocaleTimeString()}</span>
                <ExternalLink className="h-3 w-3 cursor-pointer hover:text-primary" />
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Radio className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Connecting to social media streams...</p>
            <p className="text-xs">Monitoring 15 platforms globally</p>
          </div>
        )}
        
        {streamStatus === 'disconnected' && (
          <div className="bg-destructive/20 p-3 rounded-lg border border-destructive/30">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Stream Disconnected</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Attempting to reconnect...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};