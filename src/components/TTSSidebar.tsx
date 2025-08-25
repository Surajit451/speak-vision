import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Mic, 
  Settings, 
  AudioWaveform, 
  Headphones,
  Music,
  Zap,
  User
} from "lucide-react";

interface TTSSidebarProps {
  className?: string;
}

export function TTSSidebar({ className }: TTSSidebarProps) {
  const [activeTab, setActiveTab] = useState("text-to-speech");

  const mainNavItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "voices", label: "Voices", icon: Mic },
    { id: "text-to-speech", label: "Text to Speech", icon: Headphones },
    { id: "voice-changer", label: "Voice Changer", icon: AudioWaveform },
    { id: "sound-effects", label: "Sound Effects", icon: Music },
    { id: "voice-isolator", label: "Voice Isolator", icon: Settings },
  ];

  const productItems = [
    { id: "studio", label: "Studio", icon: Mic },
    { id: "music", label: "Music", icon: Music },
    { id: "developers", label: "Developers", icon: Zap },
  ];

  return (
    <div className={`w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Headphones className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">SpeechCraft</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-6">
          <span className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">
            Playground
          </span>
          <div className="mt-2 space-y-1">
            {mainNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-10 ${
                  activeTab === item.id 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        <div className="mt-6">
          <span className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">
            Products
          </span>
          <div className="mt-2 space-y-1">
            {productItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <User className="w-4 h-4" />
          My Account
        </Button>
      </div>
    </div>
  );
}