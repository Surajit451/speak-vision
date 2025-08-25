import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles } from "lucide-react";

interface VoiceControlsProps {
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  speed: number[];
  setSpeed: (speed: number[]) => void;
  stability: number[];
  setStability: (stability: number[]) => void;
  similarity: number[];
  setSimilarity: (similarity: number[]) => void;
}

const voices = [
  { id: "alloy", name: "Alloy", description: "Neutral, balanced voice" },
  { id: "echo", name: "Echo", description: "Warm, engaging tone" },
  { id: "fable", name: "Fable", description: "Expressive storytelling voice" },
  { id: "onyx", name: "Onyx", description: "Deep, authoritative voice" },
  { id: "nova", name: "Nova", description: "Bright, energetic voice" },
  { id: "shimmer", name: "Shimmer", description: "Gentle, soothing voice" },
];

const models = [
  { id: "tts-1", name: "Standard TTS", description: "Fast, efficient synthesis" },
  { id: "tts-1-hd", name: "HD TTS", description: "Higher quality, more natural" },
];

export function VoiceControls({
  selectedVoice,
  setSelectedVoice,
  selectedModel,
  setSelectedModel,
  speed,
  setSpeed,
  stability,
  setStability,
  similarity,
  setSimilarity,
}: VoiceControlsProps) {
  const [activeTab, setActiveTab] = useState("Settings");

  return (
    <div className="w-80 h-screen bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("Settings")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "Settings"
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "History"
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              History
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Voice Design Upgrade */}
        <Card className="p-4 bg-gradient-primary border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary-foreground">Try Voice Design for v3</h3>
              <p className="text-sm text-primary-foreground/80">
                Create expressive voices for the OpenAI TTS model
              </p>
            </div>
          </div>
        </Card>

        {/* Voice Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Voice</Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div>
                      <div className="font-medium">{voice.name}</div>
                      <div className="text-xs text-muted-foreground">{voice.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.description}</div>
                    </div>
                    {model.id === "tts-1-hd" && (
                      <Badge variant="secondary" className="ml-2">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Speed</Label>
            <span className="text-sm text-muted-foreground">{speed[0].toFixed(1)}x</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            max={4}
            min={0.25}
            step={0.25}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>

        {/* Stability Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Stability</Label>
            <span className="text-sm text-muted-foreground">{Math.round(stability[0] * 100)}%</span>
          </div>
          <Slider
            value={stability}
            onValueChange={setStability}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>More variable</span>
            <span>More stable</span>
          </div>
        </div>

        {/* Similarity Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Similarity</Label>
            <span className="text-sm text-muted-foreground">{Math.round(similarity[0] * 100)}%</span>
          </div>
          <Slider
            value={similarity}
            onValueChange={setSimilarity}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}