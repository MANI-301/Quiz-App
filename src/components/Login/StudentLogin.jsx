import { useState } from "react";
<<<<<<< HEAD
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginUser } from "../../services/api";
=======
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api.js";
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SchoolIcon from "@mui/icons-material/School";
import "../../styles/login.css";

var StudentLogin = function () {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
<<<<<<< HEAD
  
  var navigate = useNavigate();
  var location = useLocation();

  var from = location.state?.from?.pathname || "/voucher";

  var labelStyle = {
    color: "#666666",
    "&.Mui-focused": { color: "#072ff9" }
  };
=======
  var navigate = useNavigate();
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4

  var handleLogin = async function (e) {
    e.preventDefault();
    setError("");
<<<<<<< HEAD

    if (!email) { setError("Email is required"); return; }
    if (!password) { setError("Password is required"); return; }

    try {
      var user = await loginUser(email, password);
      
      if (user && user.role === "student") {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        navigate(from, { replace: true });
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check the server.");
=======
    if(!email) { setError("Email is required"); return; }
    if(!password) { setError("Password is required"); return; }
    if (!email || !password) { setError("Please fill in all fields"); return; }
    var user = await loginUser(email, password);
    if (user && user.role === "student") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/voucher");
    } else {
      setError("Invalid email or password");
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
    }
  };

  return (
    <div className="login-wrapper">
      <Container maxWidth="sm">
        <Card className="login-card">
          <div className="login-header">
            <SchoolIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Login</Typography>
          </div>
          <CardContent className="login-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
<<<<<<< HEAD
              <TextField 
                fullWidth 
                label="Email ID" 
                value={email} 
                onChange={function (e) { setEmail(e.target.value); }} 
                sx={{ mb: 3 }}
                InputLabelProps={{ sx: labelStyle }} // Prevents label color change
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#2ecc71" }} />
                    </InputAdornment>
                  ) 
                }}
              />
              <TextField 
                fullWidth 
                label="Password" 
                type="password" 
                value={password} 
                onChange={function (e) { setPassword(e.target.value); }} 
                sx={{ mb: 1 }} // Reduced margin to tuck the "Forgot Password" link closer
                InputLabelProps={{ sx: labelStyle }} // Prevents label color change
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#2ecc71" }} />
                    </InputAdornment>
                  ) 
                }}
              />

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: "right", mb: 3 }}>
                <Link 
                  to="/forgot-password" 
                  style={{ color: "#666666", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  sx={{
                    py: 1.5, 
                    background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", 
                    fontWeight: 600,
                    "&:hover": { background: "linear-gradient(135deg, #2ecc71, #27ae60)" }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={function () { setEmail(""); setPassword(""); setError(""); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#2ecc71", color: "#2ecc71" }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Link to="/register" style={{ color: "#2ecc71", textDecoration: "none", fontWeight: 600 }}>
                New user? Register here
              </Link>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/admin/login" style={{ color: "#ff5e00", textDecoration: "none", fontSize: "0.875rem" }}>
                Admin Login
              </Link>
=======
              <TextField fullWidth label="Email ID" value={email} onChange={function (e) { setEmail(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              <TextField fullWidth label="Password" type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient( #002fff)" }
                }}>Login</Button>
                <Button variant="outlined" fullWidth onClick={function () { setEmail(""); setPassword(""); setError(""); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/register" style={{ color: "#2ecc71", textDecoration: "none", fontWeight: 600}}>New register Click here?</Link>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/admin/login" style={{ color: "#ff5e00", textDecoration: "none", fontSize: "0.rem" }}>Admin Login</Link>
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

<<<<<<< HEAD
export default StudentLogin;
=======
export default StudentLogin;
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
