import { useState } from "react";
import { TTSSidebar } from "@/components/TTSSidebar";
import { TTSMain } from "@/components/TTSMain";
import { VoiceControls } from "@/components/VoiceControls";

export default function TextToSpeech() {
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [selectedModel, setSelectedModel] = useState("tts-1-hd");
  const [speed, setSpeed] = useState([1.0]);
  const [stability, setStability] = useState([0.5]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [text, setText] = useState("");

  return (
    <div className="h-screen bg-background flex">
      <TTSSidebar />
      <TTSMain
        selectedVoice={selectedVoice}
        selectedModel={selectedModel}
        speed={speed}
        text={text}
        setText={setText}
      />
      <VoiceControls
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        speed={speed}
        setSpeed={setSpeed}
        stability={stability}
        setStability={setStability}
        similarity={similarity}
        setSimilarity={setSimilarity}
      />
    </div>
  );
}