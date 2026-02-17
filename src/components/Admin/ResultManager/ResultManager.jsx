import { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Chip, IconButton, Dialog, DialogTitle,
<<<<<<< HEAD
  DialogContent, DialogActions, Button, InputAdornment 
=======
  DialogContent, DialogActions, Button
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SearchIcon from "@mui/icons-material/Search";
<<<<<<< HEAD
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // 1. Import Icon
import * as XLSX from 'xlsx'; // 2. Import SheetJS
=======
import InputAdornment from "@mui/material/InputAdornment";
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
import { getResults, deleteResult } from "../../../services/api.js";
import "../../../styles/admin.css";

var ResultManager = function () {
  var [results, setResults] = useState([]);
  var [filter, setFilter] = useState("");
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);

<<<<<<< HEAD
=======
 
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  var load = async function () { 
    const data = await getResults();
    setResults(data); 
  };
  
  useEffect(function () { load(); }, []);

  var filtered = results.filter(function (r) {
    return r.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      r.examName.toLowerCase().includes(filter.toLowerCase());
  });

<<<<<<< HEAD
  // 3. Add Export Functionality
  var handleExport = function () {
    if (filtered.length === 0) {
      alert("No results to export!");
      return;
    }
    
    // Format data for Excel
    var dataToExport = filtered.map(function(r) {
      return {
        "Student Name": r.studentName,
        "Exam Name": r.examName,
        "Status": r.status,
        "Total Marks": r.totalMarks,
        "Obtained Marks": r.obtainedMarks,
        "Percentage": ((r.obtainedMarks / r.totalMarks) * 100).toFixed(2) + "%",
        "Date": new Date(r.date).toLocaleDateString()
      };
    });

    var ws = XLSX.utils.json_to_sheet(dataToExport);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    
    // Save file
    XLSX.writeFile(wb, "Student_Results.xlsx");
  };

=======
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  var confirmDelete = function (id) { setDeleteId(id); setDeleteOpen(true); };
  
  var handleDelete = async function () {
    await deleteResult(deleteId);
    setDeleteOpen(false);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Typography variant="h5" className="management-title" sx={{ mb: 3 }}>Result Management</Typography>
<<<<<<< HEAD
      
      {/* Search and Export Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "stretch" }}>
        <TextField 
          label="Search by Student or Exam Name" 
          value={filter}
          onChange={function (e) { setFilter(e.target.value); }}
          sx={{ 
            flexGrow: 1, 
            minWidth: 300, 
            "& .MuiOutlinedInput-root": { color: "#e0e0e0" }, 
            "& .MuiInputLabel-root": { color: "#8fbc8f" }, 
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } 
          }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
        />

        <Button 
          variant="outlined" 
          startIcon={<FileDownloadIcon />} 
          onClick={handleExport}
          sx={{ 
            borderColor: "#3498db", 
            color: "#3498db", 
            fontWeight: 600, 
            px: 3,
            "&:hover": { borderColor: "#2980b9", background: "rgba(52, 152, 219, 0.1)" } 
          }}
        >
          Export Excel
        </Button>
      </Box>

=======
      <TextField label="Search by Student or Exam Name" value={filter}
        onChange={function (e) { setFilter(e.target.value); }}
        sx={{ mb: 3, minWidth: 350, "& .MuiOutlinedInput-root": { color: "#e0e0e0" }, "& .MuiInputLabel-root": { color: "#8fbc8f" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
      />
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.3)", background: "#112211" }}>
        <Table>
          <TableHead className="admin-table-header">
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Marks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Obtained Marks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} sx={{ textAlign: "center", py: 4, color: "#6b8f6b" }}>No results found</TableCell></TableRow>
            ) : (
              filtered.map(function (r, i) {
                return (
                  <TableRow key={r.id || i} hover sx={{ "&:hover": { background: "rgba(46,204,113,0.05)" } }}>
                    <TableCell sx={{ color: "#c0c0c0" }}>{i + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500, color: "#e0e0e0" }}>{r.studentName}</TableCell>
                    <TableCell sx={{ color: "#c0c0c0" }}>{r.examName}</TableCell>
                    <TableCell>
                      <Chip label={r.status} size="small" sx={{
                        background: r.status === "Pass" ? "rgba(46,204,113,0.15)" : "rgba(231,76,60,0.15)",
                        color: r.status === "Pass" ? "#2ecc71" : "#e74c3c", fontWeight: 600
                      }} />
                    </TableCell>
                    <TableCell sx={{ color: "#c0c0c0" }}>{r.totalMarks}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2ecc71" }}>{r.obtainedMarks}</TableCell>
                    <TableCell>
                      <IconButton sx={{ color: "#e74c3c" }} onClick={function () { confirmDelete(r.id); }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteOpen} onClose={function () { setDeleteOpen(false); }} PaperProps={{ sx: { borderRadius: 3, background: "#112211", color: "#e0e0e0" } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#f39c12" }}>
          <WarningAmberIcon sx={{ color: "#f39c12" }} /> Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#c0c0c0" }}>Are you sure you want to delete this student result? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function () { setDeleteOpen(false); }} sx={{ borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultManager;