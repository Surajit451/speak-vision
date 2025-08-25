import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { 
  Play, 
  Pause, 
  Download, 
  BookOpen, 
  Laugh, 
  Radio,
  Globe,
  Film,
  Mic,
  Gamepad2,
  Podcast,
  GraduationCap,
  Loader2
} from "lucide-react";

interface TTSMainProps {
  selectedVoice: string;
  selectedModel: string;
  speed: number[];
  text: string;
  setText: (text: string) => void;
}

const quickActions = [
  { id: "story", label: "Narrate a story", icon: BookOpen },
  { id: "joke", label: "Tell a silly joke", icon: Laugh },
  { id: "ad", label: "Record an advertisement", icon: Radio },
  { id: "languages", label: "Speak in different languages", icon: Globe },
  { id: "movie", label: "Direct a dramatic movie scene", icon: Film },
  { id: "character", label: "Hear from a video game character", icon: Gamepad2 },
  { id: "podcast", label: "Introduce your podcast", icon: Podcast },
  { id: "meditation", label: "Guide a meditation class", icon: GraduationCap },
];

export function TTSMain({ selectedVoice, selectedModel, speed, text, setText }: TTSMainProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter some text",
        description: "Enter the text you want to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Here you would integrate with OpenAI's TTS API
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful generation
      const mockAudioUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+jqul4XBSZWkuXdVCIcAAmjJ1Z7V0NDjLWPqzFaFElMnM/Km10VCz6Fx+LUeS4BL3XH797Dggoq1c8b+FvjQ2ub9JBmCxBWqN72s2AbCDqH1Oq7dCoCMHHL6+fFeA0LJM7O8dqXRAwWUqLk7a9SFAg7jNjz1X0qBC50yNrs0n8vBSiX4dbkjgAJC85h+";
      setAudioUrl(mockAudioUrl);
      
      toast({
        title: "Speech generated successfully!",
        description: "You can now play or download your audio.",
      });
    } catch (error) {
      toast({
        title: "Failed to generate speech",
        description: "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'speech.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleQuickAction = (actionId: string) => {
    const prompts = {
      story: "Once upon a time, in a land far away, there lived a brave adventurer who...",
      joke: "Why don't scientists trust atoms? Because they make up everything!",
      ad: "Introducing the revolutionary new product that will change your life forever...",
      languages: "Hello! Bonjour! Hola! Guten Tag! こんにちは! 你好!",
      movie: "In a world where silence reigns supreme, one voice will shatter the darkness...",
      character: "Greetings, warrior! Your quest awaits in the mystical realm of...",
      podcast: "Welcome to another episode of TechTalk, where we explore the latest innovations...",
      meditation: "Take a deep breath and let your mind settle into a place of peace and tranquility...",
    };
    
    setText(prompts[actionId as keyof typeof prompts] || "");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Text to Speech</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Text Input */}
        <div className="space-y-4">
          <Textarea
            placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] text-lg resize-none border-2 focus:border-primary bg-card"
          />
          
          <div className="flex items-center gap-4">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Generate Speech
                </>
              )}
            </Button>
            
            {audioUrl && (
              <>
                <Button
                  onClick={handlePlay}
                  variant="outline"
                  className="border-primary/20 hover:border-primary"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-primary/20 hover:border-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Get started with</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors group"
                onClick={() => handleQuickAction(action.id)}
              >
                <div className="flex items-center gap-3">
                  <action.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Audio Element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
      </div>
    </div>
  );
}