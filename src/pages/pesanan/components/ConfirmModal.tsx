import React from "react";
import { Modal, Typography, Box } from "@mui/material";
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
          justifyContent: "space-between"
        }}
      >
        <div>
          <Typography
            variant="h6"
            component="h1"
            sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
          >
            Anda Yakin?
          </Typography>
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Data yang telah dibuat tidak bisa diubah.
          </Typography>
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