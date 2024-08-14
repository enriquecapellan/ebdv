export function useSpeak() {
  const message = new SpeechSynthesisUtterance();
  message.voice = speechSynthesis.getVoices()[96];

  const speak = (text: string) => {
    message.text = text;
    speechSynthesis.speak(message);
  };

  return { speak };
}
