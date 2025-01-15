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

const ManajemenMenuTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuProps[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  });

  const StyledTableCell = styled(TableCell)({
    fontWeight: 600,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="py-20 relative">
      {" "}
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
            {items
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
                    <button
                      onClick={() => navigate(`/manajemen-menu/edit/${row.id}`)}
                      className="hover:rounded-full hover:p-2 hover:bg-neutral40 transition-all"
                    >
                      <HiOutlinePencil size={20} />
                    </button>{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="absolute bottom-4 right-4">
        <Pagination
          count={Math.ceil(items.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="circular"
          color="standard"
        />
      </div>
    </div>
  );
};

export default ManajemenMenuTable;
