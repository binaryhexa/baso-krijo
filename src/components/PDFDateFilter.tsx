import React from "react";
import { format } from "date-fns";
import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportPDF from "./SalesReportPDF";
import CustomButton from "./CustomButton";

interface DateFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  reportData: { menu_name: string; quantity: number; total_price: number }[];
  totalPrice: number;
  selectedPeriod: string;
}

const DateFilterModal: React.FC<DateFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  reportData,
  totalPrice,
  selectedPeriod,
}) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());

  const handleApply = () => {
    if (startDate && endDate) {
      onApply(startDate, endDate);
      onClose();
    }
  };

  const period =
    selectedPeriod ||
    `${format(startDate || new Date(), "d MMMM yyyy")} - ${format(
      endDate || new Date(),
      "d MMMM yyyy"
    )}`;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="backdrop-blur-sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          width: "100%",
          maxWidth: 600,
        },
      }}
    >
      <h1 className="text-center text-xl font-medium mt-6 mb-6">
        Pilih Periode Tanggal untuk Laporan
      </h1>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <TextField
              label="Tanggal Awal"
              type="date"
              value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              label="Tanggal Akhir"
              type="date"
              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                borderRadius: "50px", 
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className="flex justify-center gap-4">
        <CustomButton
          label="Batal"
          variant="outlined"
          onClick={onClose}
          className="w-full rounded-full"
        />
        <PDFDownloadLink
          document={
            <SalesReportPDF
              reportData={reportData}
              totalPrice={totalPrice}
              period={period}
            />
          }
          fileName="Laporan Penjualan.pdf"
          className="w-full"
        >
          <CustomButton
            label="Download Laporan"
            onClick={handleApply}
            className="rounded-full w-full"
          />
        </PDFDownloadLink>
      </DialogActions>
    </Dialog>
  );
};

export default DateFilterModal;
