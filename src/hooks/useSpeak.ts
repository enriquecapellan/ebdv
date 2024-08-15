export function useSpeak() {
  const message = new SpeechSynthesisUtterance();

  const speak = (text: string) => {
    message.text = text;
    speechSynthesis.speak(message);
  };

  return { speak };
}
