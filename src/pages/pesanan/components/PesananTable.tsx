import { useState, useEffect } from "react";
import { OrderProps } from "@/utils/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import ActionButton from "@/components/ActionButton";

const PesananTable = () => {
  const [data, setData] = useState<OrderProps[]>([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        if (response.data.success) {
          setData(response.data.data);
          console.log("Data pesanan:", response.data.data);
        }
      } catch (error) {
        console.error("Gagal mendapatkan data pesanan:", error);
      }
    };

    fetchOrders();
  }, []);

  const StyledTableCell = styled(TableCell)({
    fontWeight: 600,
  });

  const getStatusBadge = (status_pesanan: string) => {
    switch (status_pesanan) {
      case "Sedang Dibuat":
        return (
          <span className="font-medium text-orange-500 ">Sedang Dibuat</span>
        );
      case "Selesai":
        return (
          <span className="rounded-full font-medium text-green-500 ">
            Selesai
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSortRequest = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const numA = parseInt(a.id_pesanan, 10);
        const numB = parseInt(b.id_pesanan, 10);
        if (isNaN(numA) || isNaN(numB)) return 0;

        return order === "asc" ? numA - numB : numB - numA;
      })
    );
  };

  return (
    <div className="py-12 relative">
      <TableContainer className="rounded-2xl">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <StyledTableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={handleSortRequest}
                >
                  No
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center">Kode Pesanan</StyledTableCell>
              <StyledTableCell align="center">Tanggal</StyledTableCell>
              <StyledTableCell align="center">Nama Pelanggan</StyledTableCell>
              <StyledTableCell align="center">Status Pesanan</StyledTableCell>
              <StyledTableCell align="center">Jenis Pesanan</StyledTableCell>
              <StyledTableCell align="center">Total Harga</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Tidak ada Data.
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id_pesanan}>
                    <TableCell align="center">
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">{row.kode_pesanan}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.created_at)}
                    </TableCell>
                    <TableCell align="center">{row.nama_pembeli}</TableCell>
                    <TableCell align="center">
                      {getStatusBadge(row.status_pesanan)}
                    </TableCell>
                    <TableCell align="center">{row.jenis_pesanan}</TableCell>
                    <TableCell align="center">
                      Rp. {row.total_harga.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <ActionButton
                        detailPath={`/admin/pesanan/${row.id_pesanan}`}
                      />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="absolute bottom-1 right-4">
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="circular"
          color="standard"
        />
      </div>
    </div>
  );
};

export default PesananTable;
