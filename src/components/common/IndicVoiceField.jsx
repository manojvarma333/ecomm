import React, { useState, useRef, useEffect } from 'react';

// Map browser language codes to human-friendly names
const langMap = {
  'en-IN': 'english',
  'hi-IN': 'hindi',
  'te-IN': 'telugu',
  'ta-IN': 'tamil',
  'kn-IN': 'kannada',
  'ml-IN': 'malayalam',
  'bn-IN': 'bengali',
  'gu-IN': 'gujarati',
  'mr-IN': 'marathi',
  'pa-IN': 'punjabi',
};

// Map language names to Speech-Synthesis locale codes
const voiceMap = {
  hindi: 'hi-IN',
  telugu: 'te-IN',
  tamil: 'ta-IN',
  kannada: 'kn-IN',
  malayalam: 'ml-IN',
  bengali: 'bn-IN',
  gujarati: 'gu-IN',
  marathi: 'mr-IN',
  punjabi: 'pa-IN',
  english: 'en-IN',
};

/**
 * Reusable input that supports Indic speech-to-text and text-to-speech.
 * Props:
 *  label     – field label
 *  value     – current value (string)
 *  setValue  – setter function from parent useState
 */
const IndicVoiceField = ({ label, value, setValue }) => {
  const [recording, setRecording] = useState(false);
  const [langCode, setLangCode] = useState('hindi'); // default
  const recognizerRef = useRef(null);
  

  useEffect(() => {
    const browserLang = navigator.language || 'en-IN';
    const detected = langMap[browserLang] || 'hindi';
    setLangCode(detected);
  }, []);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizerRef.current = new SpeechRecognition();
    recognizerRef.current.lang = voiceMap[langCode] || 'en-IN';
    recognizerRef.current.interimResults = false;
    recognizerRef.current.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setValue(transcript);
    };
    recognizerRef.current.onerror = () => {
      alert('Voice transcription failed.');
    };
    recognizerRef.current.onend = () => {
      setRecording(false);
    };
    recognizerRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recognizerRef.current?.stop();
  };


  const speakText = () => {
    if (!value) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(value);
    utter.lang = voiceMap[langCode] || 'en-IN';
    synth.speak(utter);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="mb-1">
        <select
          value={langCode}
          onChange={(e) => setLangCode(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {Object.keys(voiceMap).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Speak or type here"
          className="flex-1 border px-3 py-2 rounded-l"
        />
        {!recording ? (
          <button type="button" onClick={startRecording} className="bg-blue-600 text-white px-3 py-2">
            🎙️
          </button>
        ) : (
          <button type="button" onClick={stopRecording} className="bg-red-600 text-white px-3 py-2">
            🛑
          </button>
        )}
        <button type="button" onClick={speakText} className="bg-purple-600 text-white px-3 py-2 rounded-r">
          🔊
        </button>
      </div>
    </div>
  );
};

export default IndicVoiceField;
