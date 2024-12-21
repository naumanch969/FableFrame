import React, { useState, useEffect } from "react";

const TextToSpeech: React.FC<{ text: string }> = ({ text }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    // Fetch voices when the component mounts
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }
    fetchVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = speed;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Text to Speech Converter</h1>

      <div className="flex flex-col sm:flex-row justify-between w-full mt-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <label className="font-medium">Voice</label>
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVoice || ""}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices
              .filter((voice) => voice.lang.startsWith("en"))
              .map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Speed</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-center text-sm mt-1">{speed.toFixed(1)}x</span>
        </div>
      </div>
      <button
        className="flex items-center justify-center px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSpeak}
      >
        <img src="/mic.svg" alt="Mic" className="w-5 h-5 mr-2" />
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
