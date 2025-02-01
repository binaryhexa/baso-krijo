import { BahanBakuProps } from "@/utils/interfaces";
import {
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";

interface ApiResponse {
  status: string;
  data: BahanBakuProps[];
}

const BahanBakuTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<BahanBakuProps[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    axios
      .get<ApiResponse>("http://localhost:5000/api/bahan-baku")
      .then((response) => {
        setItems(response.data.data || []);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
        setItems([]);
      });
  };

  const StyledTableCell = styled(TableCell)({
    fontWeight: 600,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedItems = Array.isArray(items) 
    ? items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("id-ID", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      };

  return (
    <div className="py-12 relative">
      <TableContainer className="rounded-2xl">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Tanggal</StyledTableCell>
              <StyledTableCell align="center">Nama Bahan</StyledTableCell>
              <StyledTableCell align="center">Harga</StyledTableCell>
              <StyledTableCell align="center">Jumlah</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedItems.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={6} className="text-gray-500">
                  Tidak ada Data.
                </TableCell>
              </TableRow>
            ) : (
              displayedItems.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.created_at)}</TableCell>
                  <TableCell align="center">{row.nama}</TableCell>
                  <TableCell align="center">
                    Rp. {row.harga.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{row.jumlah}</TableCell>
                  <TableCell align="center">
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/stok/bahan/edit/${row.id}`)
                        }
                        className="hover:rounded-full hover:p-2 hover:bg-neutral40 transition-all"
                      >
                        <HiOutlinePencil size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="absolute bottom-1 right-4">
        <Pagination
          count={Math.ceil((Array.isArray(items) ? items.length : 0) / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="circular"
          color="standard"
        />
      </div>
    </div>
  );
};

export default BahanBakuTable;