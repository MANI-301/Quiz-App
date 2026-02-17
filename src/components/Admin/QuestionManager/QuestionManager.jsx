<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
// 1. IMPORT useLocation
import { useLocation } from "react-router-dom"; 
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Select, MenuItem, FormControl, InputLabel, Alert, CircularProgress
=======
import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Select, MenuItem, FormControl, InputLabel
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
<<<<<<< HEAD
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from 'xlsx'; 
=======
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
import {
  getExams, getQuestionsByExam, addQuestion, updateQuestion, deleteQuestion
} from "../../../services/api.js";
import "../../../styles/admin.css";

<<<<<<< HEAD
// Helper function to create a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

var QuestionManager = function () {
  // 2. GET LOCATION STATE
  var location = useLocation(); 

  var [exams, setExams] = useState([]);
  
  // 3. SET INITIAL ID FROM DASHBOARD (if exists), otherwise empty
  var [selectedExamId, setSelectedExamId] = useState(location.state?.selectedExamId || "");
  
=======
var QuestionManager = function () {
  var [exams, setExams] = useState([]);
  var [selectedExamId, setSelectedExamId] = useState("");
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  var [questions, setQuestions] = useState([]);
  var [open, setOpen] = useState(false);
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);
  var [editId, setEditId] = useState(null);
  var [form, setForm] = useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" });
<<<<<<< HEAD
  var [importError, setImportError] = useState("");
  var [loading, setLoading] = useState(false);
  var [progress, setProgress] = useState(0); 

  var fileInputRef = useRef(null);

  useEffect(function () { 
    async function loadExams() {
      try {
        const data = await getExams();
        setExams(data);
      } catch (e) {
        console.error("Server seems down");
      }
=======

  useEffect(function () { 
    async function loadExams() {
      const data = await getExams();
      setExams(data);
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
    }
    loadExams();
  }, []);

  useEffect(function () {
    async function loadQs() {
      if (selectedExamId) {
        const data = await getQuestionsByExam(selectedExamId);
        setQuestions(data);
      } else {
        setQuestions([]);
      }
    }
    loadQs();
  }, [selectedExamId]);

  var reload = async function () { 
    if (selectedExamId) {
      const data = await getQuestionsByExam(selectedExamId);
      setQuestions(data);
    }
  };

  var handleOpen = function (q) {
    if (q) { setEditId(q.id); setForm({ question: q.question, optionA: q.optionA, optionB: q.optionB, optionC: q.optionC, optionD: q.optionD, correctOption: q.correctOption }); }
    else { setEditId(null); setForm({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" }); }
    setOpen(true);
  };

  var handleSave = async function () {
    if (!form.question || !selectedExamId) return;
<<<<<<< HEAD
    try {
      if (editId) await updateQuestion(editId, form);
      else await addQuestion(Object.assign({}, form, { examId: selectedExamId }));
      setOpen(false); 
      reload();
    } catch (err) {
      alert("Failed to save. Is the server running?");
    }
=======
    if (editId) await updateQuestion(editId, form);
    else await addQuestion(Object.assign({}, form, { examId: selectedExamId }));
    setOpen(false); 
    reload();
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  };

  var confirmDelete = function (id) { setDeleteId(id); setDeleteOpen(true); };
  
  var handleDelete = async function () { 
    await deleteQuestion(deleteId); 
    setDeleteOpen(false); 
    setDeleteId(null); 
    reload(); 
  };

<<<<<<< HEAD
  var handleExport = function () {
    if (questions.length === 0) {
      alert("No questions to export!");
      return;
    }
    var dataToExport = questions.map(function(q) {
      return {
        "Question": q.question,
        "Option A": q.optionA,
        "Option B": q.optionB,
        "Option C": q.optionC,
        "Option D": q.optionD,
        "Correct Option": q.correctOption
      };
    });
    var ws = XLSX.utils.json_to_sheet(dataToExport);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
    var fileName = (selectedExam ? selectedExam.name : "Exam") + "_Questions.xlsx";
    XLSX.writeFile(wb, fileName);
  };

  var handleImportClick = function () {
    if(fileInputRef.current) fileInputRef.current.click();
  };

  var handleFileChange = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    var fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      setImportError("Invalid file type. Please upload an Excel file (.xlsx or .xls)");
      e.target.value = "";
      return;
    }

    setImportError("");
    setLoading(true);
    setProgress(0);
    var reader = new FileReader();

    reader.onload = async function (evt) {
      try {
        var data = evt.target.result;
        var workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
        var jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setImportError("File is empty.");
          setLoading(false);
          return;
        }

        var count = 0;
        var total = jsonData.length;
        
        var existingQs = await getQuestionsByExam(selectedExamId);
        var existingTexts = existingQs.map(q => q.question.toLowerCase().trim());

        for (var i = 0; i < total; i++) {
          var row = jsonData[i];
          var qText = row["Question"] || row["question"] || row["QUESTION"];
          var optA = row["Option A"] || row["optionA"] || row["Option a"];
          var optB = row["Option B"] || row["optionB"] || row["Option b"];
          var optC = row["Option C"] || row["optionC"] || row["Option c"];
          var optD = row["Option D"] || row["optionD"] || row["Option d"];
          var correct = row["Correct Option"] || row["correctOption"] || "A";

          if (qText && optA && optB) {
            if (!existingTexts.includes(String(qText).toLowerCase().trim())) {
               var newQ = {
                examId: selectedExamId,
                question: qText,
                optionA: optA,
                optionB: optB,
                optionC: optC || "",
                optionD: optD || "",
                correctOption: String(correct).trim().toUpperCase() || "A"
              };
              
              await addQuestion(newQ);
              count++;
              await wait(500); 
            }
          }
          setProgress(Math.round(((i + 1) / total) * 100));
        }
        
        setLoading(false);
        if (count > 0) {
          alert("Success! Imported " + count + " new questions.");
          reload();
        } else {
          setImportError("No new valid questions found (duplicates skipped).");
        }
        
      } catch (err) {
        console.error("Import Error:", err);
        setLoading(false);
        if (err.message && err.message.includes("Network")) {
          setImportError("Server disconnected. Please restart 'npm run server'.");
        } else {
          setImportError("Error parsing file: " + (err.message || "Unknown error"));
        }
      }
    };
    
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

=======
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  var selectedExam = exams.find(function (e) { return e.id === selectedExamId; });
  var dialogSx = { "& .MuiOutlinedInput-root": { color: "#e0e0e0" }, "& .MuiInputLabel-root": { color: "#8fbc8f" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } };

  return (
    <Box>
      <Typography variant="h5" className="management-title" sx={{ mb: 3 }}>Question Management</Typography>

      <FormControl sx={{ mb: 3, minWidth: 300 }}>
        <InputLabel sx={{ color: "#8fbc8f" }}>Select Exam</InputLabel>
        <Select value={selectedExamId} label="Select Exam" onChange={function (e) { setSelectedExamId(e.target.value); }}
          sx={{ color: "#e0e0e0", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } }}>
          {exams.map(function (e) {
            return <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>;
          })}
        </Select>
      </FormControl>

<<<<<<< HEAD
      {importError && <Alert severity="error" sx={{ mb: 2 }}>{importError}</Alert>}
      
      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, color: "#2ecc71" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} color="inherit" />
            <Typography>Importing questions... {progress}%</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#f39c12" }}>Please do not close this page.</Typography>
        </Box>
      )}

      {selectedExam && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#2ecc71", fontWeight: 600 }}>Questions for: {selectedExam.name}</Typography>
            
            <Box sx={{ display: "flex", gap: 2 }}>
              <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".xlsx, .xls" onChange={handleFileChange} />
              
              <Button variant="contained" startIcon={<AddCircleIcon />} onClick={function () { handleOpen(); }}
                sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>Add Question</Button>

              <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={handleImportClick} disabled={loading}
                 sx={{  color:"white",background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>
                Upload questions
              </Button>

              <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}
                 sx={{ color:"white",background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>
                Download
              </Button>
                   </Box>

          </Box>

=======
      {selectedExam && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#2ecc71", fontWeight: 600 }}>Questions for: {selectedExam.name}</Typography>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={function () { handleOpen(); }}
              sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>Add Question</Button>
          </Box>
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.3)", background: "#112211" }}>
            <Table>
              <TableHead className="admin-table-header">
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Question</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Correct</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map(function (q, i) {
                  return (
                    <TableRow key={q.id} hover sx={{ "&:hover": { background: "rgba(46,204,113,0.05)" } }}>
                      <TableCell sx={{ color: "#c0c0c0" }}>{i + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 400, color: "#e0e0e0" }}>{q.question}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#2ecc71" }}>{q.correctOption}</TableCell>
                      <TableCell>
                        <IconButton sx={{ color: "#2ecc71" }} onClick={function () { handleOpen(q); }}><EditIcon /></IconButton>
                        <IconButton sx={{ color: "#e74c3c" }} onClick={function () { confirmDelete(q.id); }}><DeleteForeverIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
<<<<<<< HEAD
      
=======

>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
      <Dialog open={open} onClose={function () { setOpen(false); }} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3, background: "#112211", color: "#e0e0e0" } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#2ecc71" }}>{editId ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Exam Name" value={selectedExam ? selectedExam.name : ""} disabled sx={Object.assign({}, dialogSx, { mb: 2 })} />
          <TextField fullWidth label="Question" value={form.question} onChange={function (e) { setForm(Object.assign({}, form, { question: e.target.value })); }} sx={Object.assign({}, dialogSx, { mb: 2 })} multiline rows={2} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option A" value={form.optionA} onChange={function (e) { setForm(Object.assign({}, form, { optionA: e.target.value })); }} sx={dialogSx} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option B" value={form.optionB} onChange={function (e) { setForm(Object.assign({}, form, { optionB: e.target.value })); }} sx={dialogSx} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option C" value={form.optionC} onChange={function (e) { setForm(Object.assign({}, form, { optionC: e.target.value })); }} sx={dialogSx} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option D" value={form.optionD} onChange={function (e) { setForm(Object.assign({}, form, { optionD: e.target.value })); }} sx={dialogSx} /></Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#8fbc8f" }}>Correct Option</InputLabel>
            <Select value={form.correctOption} label="Correct Option" onChange={function (e) { setForm(Object.assign({}, form, { correctOption: e.target.value })); }}
              sx={{ color: "#e0e0e0", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } }}>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={function () { setOpen(false); }} sx={{ color: "#8fbc8f" }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ background: "#2ecc71" }}>Save</Button>
        </DialogActions>
      </Dialog>
<<<<<<< HEAD
=======

>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
      <Dialog open={deleteOpen} onClose={function () { setDeleteOpen(false); }} PaperProps={{ sx: { borderRadius: 3, background: "#112211", color: "#e0e0e0" } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#f39c12" }}>
          <WarningAmberIcon sx={{ color: "#f39c12" }} /> Confirm Delete
        </DialogTitle>
        <DialogContent><Typography sx={{ color: "#c0c0c0" }}>Are you sure you want to delete this question?</Typography></DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function () { setDeleteOpen(false); }} sx={{ borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionManager;