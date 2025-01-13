import {
    FormControl,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
  } from '@mui/material';
  import React from 'react';
  
  interface Props {
    dataTable: number;
    page: number;
    rowsPerPage: number;
    setPage: (e: number) => void;
    setRowsPerPage: (e: number) => void;
  }
  
  const PaginationTable = (props: Props) => {
    const { dataTable, page, rowsPerPage, setPage, setRowsPerPage } = props;
  
    const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(1);
    };
    return (
      <div className="flex items-center justify-between pt-6">
        <FormControl>
          <Select
            value={rowsPerPage.toString()}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="25">25</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={dataTable}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    );
  };
  
  export default PaginationTable;
  