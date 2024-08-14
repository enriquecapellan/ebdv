import { OnResultFunction, QrReader } from "react-qr-reader";
import { fetchChild } from "../services/db/children";

export const Test = () => {
  function speak(text: string) {
    const message = new SpeechSynthesisUtterance();
    message.text = text;
    message.voice = speechSynthesis.getVoices()[96];
    speechSynthesis.speak(message);
  }

  const handleSchan: OnResultFunction = async (result, error) => {
    if (result) {
      const childUrl = result.getText();
      const childId = childUrl.split("/")[4];
      const child = await fetchChild(childId);

      if (child) {
        speak(
          `Hola ${child.name}! Bienvenido. has desbloqueado el acceso para el gruopo de ${child.group.calling} del agente ${child.group.calling}!`
        );
      }
    }
    if (error) {
      console.error("Error reading QR code:", error);
      return;
    }
  };

  return <QrReader onResult={handleSchan} constraints={{}} />;
};
