import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "../../../styles/login.css";

var AdminLogin = function () {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [role, setRole] = useState("admin");
  var [error, setError] = useState("");
  var navigate = useNavigate();

  var handleLogin = async function (e) {
    e.preventDefault();
    setError("");
    if(!email) { setError("Email is required"); return; }
    if(!password) { setError("Password is required"); return; }
    if (!email || !password) { setError("Please fill in all fields"); return; }
    
    try {
      var user = await loginUser(email, password);
      if (user && user.role === "admin") {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Login failed. Check server.");
    }
  };

  return (
    <div className="login-wrapper">
      <Container maxWidth="sm">
        <Card className="login-card">
          <div className="admin-login-header">
            <AdminPanelSettingsIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Admin Login</Typography>
          </div>
          <CardContent className="login-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField fullWidth label="Admin Email" value={email} onChange={function (e) { setEmail(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#ff5e00" }} /></InputAdornment> }} />
              <TextField fullWidth label="Password" type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#ff5e00" }} /></InputAdornment> }} />
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: "#8fbc8f" }}>Role</InputLabel>
                <Select value={role} label="Role" onChange={function (e) { setRole(e.target.value); }}
                  sx={{ color: "#e0e0e0", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(46,204,113,0.3)" } }}>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #ff5e00, #ff5e00)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #ff5e00, #ff5e00)" }
                }}>Login</Button>
                <Button variant="outlined" fullWidth onClick={function () { navigate("/"); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#ff5e00", color: "#ff5e00" }}>Cancel</Button>
              </Box>
            </form>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2, color: "#6b8f6b" }}>Admin Panel Access</Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;