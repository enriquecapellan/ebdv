import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchChild } from "../services/db/children";
import { useSpeak } from "../hooks/useSpeak";
import { Typography } from "@mui/material";
import { IChild } from "../types/models";

export const Unlock = () => {
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<IChild | null>(null);

  const { speak } = useSpeak();

  function handleClick() {
    if (child) {
      const greeting = `Hola ${child.name}! Bienvenido... has desbloqueado el acceso para el grupo de ${child.group.calling} del agente ${child.group.agent}!`;
      speak(greeting);
    }
  }

  useEffect(() => {
    async function welcome() {
      if (!id) return;
      const child = await fetchChild(id);
      setChild(child);
    }
    welcome();
  }, []);

  return (
    <div>
      {!child ? (
        <Typography variant="h4">Cargando...</Typography>
      ) : (
        <>
          <Typography variant="h4">Agente Identificado</Typography>
          <button onClick={handleClick}>Desbloquear</button>
        </>
      )}
    </div>
  );
};
