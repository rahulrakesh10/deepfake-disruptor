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
  type: 'video' | 'audio' | 'image';
  realityScore: number;
  status: 'processing' | 'complete' | 'failed';
  detections: string[];
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
      type: fileType,
      realityScore: 0,
      status: 'processing',
      detections: [],
      timestamp: new Date(),
      confidence: 0
    };

    setAnalyses(prev => [newAnalysis, ...prev.slice(0, 4)]);
    setProcessing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const realityScore = Math.floor(Math.random() * 40) + 40;
      const confidence = Math.floor(Math.random() * 30) + 70;
      const detections = [];
      
      if (realityScore < 60) {
        const possibleDetections = [
          'Facial inconsistencies detected',
          'Temporal artifacts found',
          'Lighting inconsistencies',
          'Audio-visual sync anomalies',
          'Pixel-level manipulation traces',
          'Deepfake generation signatures',
          'Synthetic voice patterns',
          'Unnatural micro-expressions'
        ];
        
        const numDetections = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numDetections; i++) {
          const detection = possibleDetections[Math.floor(Math.random() * possibleDetections.length)];
          if (!detections.includes(detection)) {
            detections.push(detection);
          }
        }
      }

      setAnalyses(prev => prev.map(analysis => 
        analysis.id === newAnalysis.id 
          ? { ...analysis, realityScore, status: 'complete', detections, confidence }
          : analysis
      ));
      setProcessing(false);
    }, 3000 + Math.random() * 2000);
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
                      
                      {analysis.detections.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Detections:</p>
                          <div className="flex flex-wrap gap-1">
                            {analysis.detections.map((detection, index) => (
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