import { useState } from "react";
import { QrReader } from "react-qr-reader";

export const Test = () => {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result.getText());
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{}}
      />
      <p>{data}</p>
    </>
  );
};
