import { OnResultFunction, QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

export const ScanQR = () => {
  const navigate = useNavigate();

  const handleSchan: OnResultFunction = async (result) => {
    if (result) {
      const childUrl = result.getText();
      const childId = childUrl.split("/").pop();
      if (childId) {
        navigate(`/unlock/${childId}`);
      }
    }
  };

  return <QrReader onResult={handleSchan} constraints={{}} />;
};
