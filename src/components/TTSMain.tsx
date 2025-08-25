import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { APIKeyDialog } from "@/components/APIKeyDialog";
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
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved securely.",
    });
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter some text",
        description: "Enter the text you want to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      setShowAPIKeyDialog(true);
      return;
    }

    setIsGenerating(true);
    try {
      console.log("Generating speech with:", { selectedVoice, selectedModel, speed: speed[0], textLength: text.length });
      
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          input: text,
          voice: selectedVoice,
          speed: speed[0],
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      
      console.log("Speech generation successful, audio URL created");
      
      toast({
        title: "Speech generated successfully!",
        description: "You can now play or download your audio.",
      });
    } catch (error) {
      console.error("Speech generation error:", error);
      toast({
        title: "Failed to generate speech",
        description: error instanceof Error ? error.message : "Please check your API key and try again.",
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
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          toast({
            title: "Playback failed",
            description: "Unable to play the audio. Please try generating again.",
            variant: "destructive",
          });
        });
        setIsPlaying(true);
      }
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `speech-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your audio file is being downloaded.",
      });
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
            onError={(e) => {
              console.error("Audio error:", e);
              toast({
                title: "Audio error",
                description: "There was an issue with the audio file.",
                variant: "destructive",
              });
            }}
            className="hidden"
          />
        )}

        {/* API Key Dialog */}
        <APIKeyDialog
          open={showAPIKeyDialog}
          onOpenChange={setShowAPIKeyDialog}
          onSave={handleSaveApiKey}
        />

        {/* API Key Status */}
        {!apiKey && (
          <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
            <p className="text-sm text-muted-foreground mb-2">
              OpenAI API key required for text-to-speech
            </p>
            <Button
              size="sm"
              onClick={() => setShowAPIKeyDialog(true)}
              className="w-full"
            >
              Add API Key
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}