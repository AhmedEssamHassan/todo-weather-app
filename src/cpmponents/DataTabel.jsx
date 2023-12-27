import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { MARK_AS_COMPLETED } from "../redux/reducers/dbSlice";
import { RiInbox2Line } from "react-icons/ri";

function DataTabel({ handleModalState }) {
  const { data } = useSelector((state) => state.db);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const createData = (rowData) => {
    return {
      id: rowData.id, // Assuming each row has a unique identifier
      title: rowData.title,
      discription: rowData.discription,
      createdAt: rowData.createdAt,
      finishedAt: rowData.finishedAt,
      completed: rowData.completed,
    };
  };

  const rows = data.map(createData);

  const handleRowSelect = (rowId) => {
    const isSelected = selectedRows?.includes(rowId);
    console.log({ isSelected });
    if (isSelected) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };

  const handleMarkAsCompleted = () => {
    dispatch(MARK_AS_COMPLETED({ selectedRows }));
    console.log({ selectedRows });
    // setSelectedRows([]);
  };

  return (
    <div className="container mx-auto">
      <div className="my-5 flex justify-start items-center gap-3">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleModalState}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMarkAsCompleted}
          disabled={selectedRows.length === 0}
        >
          Mark as Completed
        </Button>
      </div>
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">created At</TableCell>
                <TableCell align="right">Finished At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.completed ? (
                      "Compoleted"
                    ) : (
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.discription}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.finishedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="mt-20 flex flex-col justify-center items-center">
          <RiInbox2Line size={90} />
          <p>No data</p>
        </div>
      )}
    </div>
  );
}

export default DataTabel;
