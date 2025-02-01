import CustomButton from "@/components/CustomButton";
import { Dialog, styled } from "@mui/material";
import { FC } from "react";

interface ModalKonfirmasiProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 4,
    padding: "20px", 
    textAlign: "center", 
  },
}));

const ModalKonfirmasi: FC<ModalKonfirmasiProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} className="backdrop-blur-sm">
      <h1 className="font-semibold text-xl mb-4">Konfirmasi Hapus</h1>
      <p className="mb-6">{message}</p>
      <div className="flex gap-4">
        <CustomButton label="Batal" variant="outlined" onClick={onClose} className="w-full" />
        <CustomButton label="Hapus" onClick={onConfirm} className="w-full" />
      </div>
    </StyledDialog>
  );
};

export default ModalKonfirmasi;
