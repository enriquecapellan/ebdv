import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  question: string;
};

export const Confirm = ({ open, question, onClose, onAccept }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{question}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onAccept} autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
};
