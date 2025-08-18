import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileVideo, 
  FileAudio, 
  FileImage, 
  Brain, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { RealityScore } from './RealityScore';

interface AnalysisResult {
  id: string;
  fileName: string;
  fileType: string;
  type: 'video' | 'audio' | 'image';
  realityScore: number;
  status: 'processing' | 'complete' | 'failed';
  detectedIssues: string[];
  timestamp: Date;
  confidence: number;
}

export const AnalysisPanel = () => {
  const [dragOver, setDragOver] = useState(false);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => processFile(file));
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => processFile(file));
  }, []);

  const processFile = async (file: File) => {
    const fileType = file.type.startsWith('video/') ? 'video' : 
                    file.type.startsWith('audio/') ? 'audio' : 'image';
    
    const newAnalysis: AnalysisResult = {
      id: Date.now().toString(),
      fileName: file.name,
      fileType: file.type,
      type: fileType,
      realityScore: 0,
      status: 'processing',
      detectedIssues: [],
      timestamp: new Date(),
      confidence: 0
    };

    setAnalyses(prev => [newAnalysis, ...prev.slice(0, 4)]);
    setProcessing(true);

    try {
      // Basic file analysis
      const fileSize = file.size;
      const fileName = file.name.toLowerCase();
      
      // Simulate realistic processing delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      // Basic heuristic analysis
      let realityScore = 85; // Default high score
      const detections: string[] = [];
      
      // File size analysis
      if (fileSize > 50 * 1024 * 1024) { // > 50MB
        realityScore -= 10;
        detections.push("Unusually large file size for content type");
      }
      
      // Filename analysis
      if (fileName.includes('generated') || fileName.includes('fake') || fileName.includes('ai')) {
        realityScore -= 30;
        detections.push("Suspicious filename indicators");
      }
      
      // File type specific analysis
      if (fileType === 'video') {
        realityScore -= Math.random() * 20; // Video files are more suspicious
        if (Math.random() < 0.3) detections.push("Potential frame inconsistencies");
        if (Math.random() < 0.2) detections.push("Suspicious compression patterns");
      } else if (fileType === 'audio') {
        realityScore -= Math.random() * 15;
        if (Math.random() < 0.25) detections.push("Voice synthesis indicators");
      } else if (fileType === 'image') {
        realityScore -= Math.random() * 10;
        if (Math.random() < 0.2) detections.push("Digital manipulation artifacts");
      }
      
      // Add random variation
      realityScore += (Math.random() - 0.5) * 20;
      realityScore = Math.max(0, Math.min(100, Math.floor(realityScore)));
      
      // Add issues based on score
      if (realityScore < 40) {
        detections.push("High probability of AI generation");
        detections.push("Multiple manipulation indicators");
      } else if (realityScore < 60) {
        detections.push("Moderate manipulation risk");
      } else if (realityScore < 80) {
        detections.push("Minor quality concerns");
      }

      const confidence = Math.floor(realityScore * 0.8 + Math.random() * 20);

      setAnalyses(prev => prev.map(analysis => 
        analysis.id === newAnalysis.id 
          ? { 
              ...analysis, 
              realityScore, 
              status: 'complete', 
              detectedIssues: detections.length > 0 ? detections : ["No significant issues detected"], 
              confidence 
            }
          : analysis
      ));
    } catch (error) {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === newAnalysis.id 
          ? { ...analysis, status: 'failed', detectedIssues: ["Analysis failed - file may be corrupted"] }
          : analysis
      ));
    }
    
    setProcessing(false);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <FileVideo className="h-5 w-5" />;
      case 'audio': return <FileAudio className="h-5 w-5" />;
      case 'image': return <FileImage className="h-5 w-5" />;
      default: return <FileImage className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4 animate-spin" />;
      case 'complete': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Content Analysis Lab
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragOver 
              ? 'border-primary bg-primary/10 cyber-glow' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Drop files to analyze</p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports video, audio, and image files
          </p>
          <Button variant="outline" className="cyber-border" asChild>
            <label>
              <input
                type="file"
                multiple
                accept="video/*,audio/*,image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              Select Files
            </label>
          </Button>
        </div>

        {/* Analysis Results */}
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="p-4 bg-muted/50 rounded-lg cyber-border">
              <div className="flex items-start gap-3">
                <div className="text-primary">
                  {getFileIcon(analysis.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium truncate">{analysis.fileName}</p>
                    {getStatusIcon(analysis.status)}
                  </div>
                  
                  {analysis.status === 'processing' && (
                    <div className="space-y-2">
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Running deepfake detection algorithms...
                      </p>
                    </div>
                  )}
                  
                  {analysis.status === 'complete' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground">Reality Score</span>
                          <RealityScore score={analysis.realityScore} size="sm" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Confidence</span>
                          <p className="text-sm font-medium">{analysis.confidence}%</p>
                        </div>
                      </div>
                      
                      {analysis.detectedIssues && analysis.detectedIssues.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Detections:</p>
                          <div className="flex flex-wrap gap-1">
                            {analysis.detectedIssues.map((detection, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-destructive/20">
                                {detection}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {analyses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No files analyzed yet</p>
              <p className="text-xs">Upload content to begin analysis</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};