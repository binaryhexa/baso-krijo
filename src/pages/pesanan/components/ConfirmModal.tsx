import React from "react";
import { Modal, Box } from "@mui/material";
import CustomButton from "@/components/CustomButton";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center backdrop-blur-sm"
    >
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          width: "100%",
          maxWidth: 600,
          mx: 2,
          borderRadius: 5,
          maxHeight: 200,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p className="text-center font-medium text-2xl mt-2">Anda Yakin?</p>
          <p className="text-center mt-2 font-medium">
            Data pesanan yang telah diselesaikan tidak bisa diubah.
          </p>
        </div>
        <div className="flex gap-4">
          <CustomButton
            label="Batal"
            variant="outlined"
            onClick={onClose}
            className="w-full"
          />
          <CustomButton label="Yakin" onClick={onConfirm} className="w-full" />
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
