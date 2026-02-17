import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser, getUsers } from "../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
<<<<<<< HEAD
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, InputAdornment
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import "../../styles/register.css";

// 1. Helper Validation Functions
var validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

var validatePassword = function (pwd) {
  if (!pwd) return "Password is required";
=======
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "../../styles/register.css";

var validatePassword = function (pwd) {
  if(!pwd) return "Password is required";
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
  if (pwd.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(pwd)) return "Password must contain a number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return "Password must contain a special symbol";
  return "";
};

var validateContact = function (contact) {
<<<<<<< HEAD

  if (!contact) return "Contact number is required";
  if (!/^\d+$/.test(contact)) return "Contact number must contain only digits";
  if (!/^[6-9]\d{9}$/.test(contact)) {
    return "Contact number must start with indian mobile number format";
  }
  if (contact.length !== 10) return "Contact number must be at least 10 digits";
=======
  if (contact && !/^\d{10}$/.test(contact));
  return "";
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
};

var StudentRegister = function () {
  var [form, setForm] = useState({
    fullName: "", email: "", contact: "", gender: "Male", password: "", confirmPassword: ""
  });
  var [error, setError] = useState("");
  var [success, setSuccess] = useState("");
  var navigate = useNavigate();

  var handleChange = function (e) {
    setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
  };

  var handleSubmit = async function (e) {
    e.preventDefault();
    setError("");
    setSuccess("");
<<<<<<< HEAD

    // 2. Step-by-Step Validation
    if (!form.fullName.trim()) { setError("Full Name is required"); return; }
    
    if (!form.email) { setError("Email is required"); return; }
    if (!validateEmail(form.email)) { setError("Please enter a valid email address"); return; }

    var contactErr = validateContact(form.contact);
    if (contactErr) { setError(contactErr); return; }

    var pwdErr = validatePassword(form.password);
    if (pwdErr) { setError(pwdErr); return; }

    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }

    try {
      // 3. Check if user already exists
      var users = await getUsers();
      if (users.find(function (u) { return u.email === form.email; })) {
        setError("Email already registered. Please login."); 
        return;
      }

      // 4. Register User
      await addUser({
        fullName: form.fullName,
        email: form.email,
        contact: form.contact,
        gender: form.gender,
        password: form.password,
        role: "student"
=======
    
    if(!form.fullName) { setError("Full Name is required"); return; }
    if(!form.email) { setError("Email is required"); return; }
    if(!form.password) { setError("Password is required"); return; }
    if(!form.confirmPassword) { setError("Confirm Password is required"); return; }
 
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields"); return;
    }
    var pwdError = validatePassword(form.password);
    if (pwdError) { setError(pwdError); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    var contactError = validateContact(form.contact);
    if (contactError) { setError(contactError); return; }

    try {
     
      var users = await getUsers();
      if (users.find(function (u) { return u.email === form.email; })) {
        setError("Email already registered"); return;
      }

      
      await addUser({
        fullName: form.fullName, email: form.email, contact: form.contact,
        gender: form.gender, password: form.password
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(function () { navigate("/"); }, 1500);
<<<<<<< HEAD
      
    } catch (err) {
      setError("Registration failed. Server might be down.");
=======
    } catch (err) {
      setError("Registration failed. Please try again.");
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
    }
  };

  return (
    <div className="register-wrapper">
      <Container maxWidth="sm">
        <Card className="register-card">
          <div className="register-header">
            <PersonAddIcon
<<<<<<< HEAD
              sx={{
                fontSize: 50, color: "#fff", p: 1.2, borderRadius: "50%",
                background: "#047e45", mb: 1,
                transition: "0.3s", "&:hover": { transform: "scale(1.2) rotate(10deg)", boxShadow: "0 0 20px #fff" }
              }}
            />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Registration</Typography>
          </div>
          
          <CardContent className="register-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
            
            <form onSubmit={handleSubmit}>
              <TextField 
                fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} sx={{ mb: 2 }} 
                InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              
              <TextField 
                fullWidth label="Email ID" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} 
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              
              <TextField 
                fullWidth label="Contact Number" name="contact" value={form.contact} onChange={handleChange} sx={{ mb: 2 }} 
                inputProps={{ maxLength: 10 }}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "#2ecc71", mr: 1 }} />
                      <Typography sx={{ color: '#888', fontWeight: 600, borderRight: "1px solid #ccc", pr: 1, mr: 0 }}>+91</Typography>
                    </InputAdornment>
                  )
                }}
              />

              <FormControl sx={{ mb: 2, width: '100%', ml: 1 }}>
                <FormLabel sx={{ color: '#666666', fontSize: '0.9rem', '&.Mui-focused': { color: '#5ad08b' }}}>Gender</FormLabel>
                <RadioGroup row name="gender" value={form.gender} onChange={handleChange} >
                  <FormControlLabel value="Male" sx={{color:"white"}}control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label="Male" />
                  <FormControlLabel value="Female" sx={{color:"white"}} control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label="Female" />
                  <FormControlLabel value="Other"sx={{color:"white"}} control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label="Other" />
                </RadioGroup>
              </FormControl>
              
              <TextField 
                fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} 
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              
              <TextField 
                fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} sx={{ mb: 3 }} 
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#2ecc71" }} /></InputAdornment> }}
              />
              
=======
  sx={{
    fontSize: 50,
    color: "#fff",
    p: 1.2,
    borderRadius: "50%",
    background: "#047e45",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2) rotate(10deg)",
      boxShadow: "0 0 20px #fff",
    },
    mb: 1,
  }}
/>

            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Registration</Typography>
          </div>
          <CardContent className="register-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Email ID" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Contact Number" name="contact" value={form.contact} onChange={handleChange} sx={{ mb: 2 }} inputProps={{ maxLength: 10 }} />

              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
                  <FormControlLabel value="Male" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Male</Typography>} />
                  <FormControlLabel value="Female" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Female</Typography>} />
                  <FormControlLabel value="Other" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Other</Typography>} />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 1 }} required
                />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} sx={{ mb: 3, mt: 1 }} required />
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #2ecc71, #27ae60)" }
<<<<<<< HEAD
                }}>Register</Button>
                
=======
                }}>Submit</Button>
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
                <Button variant="outlined" fullWidth onClick={function () { navigate("/"); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
              </Box>
            </form>
<<<<<<< HEAD
            
=======
>>>>>>> 07a4ea7c9b1cb80912ff59dcf91419b87dfc15b4
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/" style={{ color: "#2ecc71", textDecoration: "none", fontWeight: 600 }}>Already registered? Login here</Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default StudentRegister;