import { useEffect, useState } from "react";
import { OnResultFunction, QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const ScanQR = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleSchan: OnResultFunction = async (result) => {
    if (result) {
      const childUrl = result.getText();
      const childId = childUrl.split("/").pop();
      if (childId) {
        navigate(`/unlock/${childId}`);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setShowScanner(true), 1000);
  }, []);

  return showScanner ? (
    <QrReader onResult={handleSchan} constraints={{}} />
  ) : (
    <CircularProgress />
  );
};
