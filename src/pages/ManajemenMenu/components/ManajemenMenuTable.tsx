import { MenuProps } from "@/utils/interfaces";
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
import { HiOutlineTrash } from "react-icons/hi2";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";
import ModalKonfirmasi from "./ModalKonfirmasi"; // Import modal konfirmasi

const ManajemenMenuTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuProps[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  };

  const StyledTableCell = styled(TableCell)({
    fontWeight: 600,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (idToDelete) {
      axios
        .delete(`http://localhost:5000/api/menu/${idToDelete}`)
        .then(() => {
          ToastSuccess("Menu berhasil dihapus.");
          fetchMenus();
          setOpenModal(false); 
        })
        .catch((error) => {
          console.error("Error deleting menu:", error);
          ToastFailure("Gagal menghapus menu.");
          setOpenModal(false);
        });
    }
  };

  return (
    <div className="py-12 relative">
      <TableContainer className="rounded-2xl">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Gambar</StyledTableCell>
              <StyledTableCell align="center">Nama Menu</StyledTableCell>
              <StyledTableCell align="center">Kategori</StyledTableCell>
              <StyledTableCell align="center">Harga</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length > 0 ? (
              items
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={row.image_link}
                        className="rounded-2xl h-20 object-cover w-28 m-auto"
                      />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      Rp. {row.harga.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex gap-4 items-center justify-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/manajemen_menu/edit/${row.id}`)
                          }
                          className="hover:rounded-full hover:p-2 hover:bg-neutral40 transition-all"
                        >
                          <HiOutlinePencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="hover:rounded-full hover:p-2 hover:bg-neutral40 transition-all"
                        >
                          <HiOutlineTrash size={20} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Tidak ada Data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {items.length > 0 && (
        <div className="absolute bottom-1 right-4">
          <Pagination
            count={Math.ceil(items.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            shape="circular"
            color="standard"
          />
        </div>
      )}

      <ModalKonfirmasi
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus menu ini?"
      />
    </div>
  );
};

export default ManajemenMenuTable;
