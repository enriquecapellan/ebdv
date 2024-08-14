import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchChild } from "../services/db/children";
import { useSpeak } from "../hooks/useSpeak";

export const Unlock = () => {
  const { id } = useParams<{ id: string }>();
  const { speak } = useSpeak();

  useEffect(() => {
    async function welcome() {
      if (!id) return;
      const child = await fetchChild(id);
      if (child) {
        const greeting = `Hola ${child.name}! Bienvenido... has desbloqueado el acceso para el grupo de ${child.group.calling} del agente ${child.group.agent}!`;
        speak(greeting);
      }
    }
    welcome();
  }, []);

  return <div>Unlock</div>;
};
