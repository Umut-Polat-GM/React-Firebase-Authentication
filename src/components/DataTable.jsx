import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Box,
    TablePagination,
    Avatar,
    IconButton,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { onSnapshot } from "firebase/firestore";
import { db, deleteStudent } from "../firebase";
import { collection } from "firebase/firestore";

const columns = [
    { id: "tc", label: "TC Kimlik No" },
    { id: "name", label: "İsim" },
    { id: "surname", label: "Soyad" },
    { id: "fatherName", label: "Baba Adı" },
];

const DataTable = () => {
    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const fetchStudents = () => {
        onSnapshot(collection(db, "Students"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRows(data);
        });
    };

    useEffect(() => {
        try {
            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const filteredRows = rows.filter((row) => {
        const values = Object.values(row).join("").toLowerCase();
        return values.indexOf("a") !== -1;
    });

    const handleDeleteStudent = (id) => {
        console.log(id);
        try {
            deleteStudent(id);
            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box>
            <Paper elevation={3}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Avatar</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : "asc"}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                {/* <TableCell>Düzenle</TableCell> */}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>
                                            <Avatar alt="Remy Sharp" />
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell key={column.id}>{row[column.id]}</TableCell>
                                        ))}
                                        {/* <TableCell>
                                            <Tooltip title="Öğrenci Sil" arrow>
                                                <IconButton
                                                    onClick={() => handleDeleteStudent(row.id)}
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[6, 9, 24, 100]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default DataTable;
