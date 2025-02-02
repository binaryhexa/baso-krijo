import { UserProps } from "@/utils/interfaces";
import {
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import ModalKonfirmasi from "@/pages/ManajemenMenu/components/ModalKonfirmasi";
import { ToastFailure, ToastSuccess } from "@/components/Toasts";

const ManajemenAkunTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<UserProps[]>([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    axios
      .get("http://localhost:5000/api/auth/users")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
        setItems([]);
      });
  };

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (idToDelete) {
      axios
        .delete(`http://localhost:5000/api/auth/users/${idToDelete}`)
        .then(() => {
          ToastSuccess("Akun berhasil dihapus.");
          fetchMenus();
          setOpenModal(false);
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          ToastFailure("Gagal menghapus akun.");
          setOpenModal(false);
        });
    }
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

  const handleSortRequest = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setItems((prevData) =>
      [...prevData].sort((a, b) => {
        const numA = parseInt(a.id, 10);
        const numB = parseInt(b.id, 10);
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
                {" "}
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={handleSortRequest}
                >
                  No
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Jabatan</StyledTableCell>
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
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        onClick={() => navigate(`/admin/akun/edit/${row.id}`)}
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="absolute bottom-1 right-4">
        <Pagination
          count={Math.ceil(
            (Array.isArray(items) ? items.length : 0) / rowsPerPage
          )}
          page={page}
          onChange={handlePageChange}
          shape="circular"
          color="standard"
        />
      </div>
      <ModalKonfirmasi
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message="Apakah Anda yakin ingin menghapus akun ini?"
      />
    </div>
  );
};

export default ManajemenAkunTable;
