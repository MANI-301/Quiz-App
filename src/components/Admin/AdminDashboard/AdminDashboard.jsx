import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, IconButton, Divider, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; 
import "../../../styles/admin.css";

var drawerWidth = 280;

var AdminDashboard = function () {
  var [mobileOpen, setMobileOpen] = useState(false);
  var [logoutOpen, setLogoutOpen] = useState(false); 
  var navigate = useNavigate();
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  var menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Voucher Management", icon: <ConfirmationNumberIcon />, path: "/admin/vouchers" },
    { text: "Exam Management", icon: <MenuBookIcon />, path: "/admin/exams" },
    { text: "Question Management", icon: <QuizIcon />, path: "/admin/questions" },
    { text: "Results", icon: <AssessmentIcon />, path: "/admin/results" },
  ];


  var handleLogoutClick = function () {
    setLogoutOpen(true);
  };

  var confirmLogout = function () {
    sessionStorage.removeItem("currentUser");
    setLogoutOpen(false);
    navigate("/admin/login");
  };

  var drawer = (
    <Box>
      <Toolbar />
      <Box sx={{ height: 0 }} /> 

      <div className="admin-sidebar-header">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", width: 44, height: 44 }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>Quiz App</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>Admin Panel</Typography>
          </Box>
        </Box>
      </div>
      <Divider sx={{ borderColor: "rgba(46,204,113,0.15)" }} />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map(function (item) {
          return (
            <ListItemButton key={item.text} onClick={function () { navigate(item.path); setMobileOpen(false); }}
              sx={{ borderRadius: 2, mb: 0.5, "&:hover": { background: "rgba(46,204,113,0.12)" },
                "&.Mui-selected": { background: "rgba(46,204,113,0.18)" } }}>
              <ListItemIcon sx={{ color: "#2ecc71", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(46,204,113,0.15)" }} />
      <List sx={{ px: 1 }}>
        
        <ListItemButton onClick={handleLogoutClick} sx={{ borderRadius: 2, "&:hover": { background: "rgba(231,76,60,0.1)" } }}>
          <ListItemIcon sx={{ color: "#e74c3c", minWidth: 40 }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500, color: "#e74c3c" }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #0d2818, #1a6b3c)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={function () { setMobileOpen(!mobileOpen); }} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>Welcome Admin</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, background: "#2ecc71", fontSize: "0.8rem" }}>
              {(currentUser.fullName || "A").charAt(0)}
            </Avatar>
            <Typography variant="body2">{currentUser.fullName}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="temporary" open={mobileOpen} onClose={function () { setMobileOpen(false); }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, background: "#0d1f0d", color: "#e0e0e0" } }}>
        {drawer}
      </Drawer>
      
      <Drawer variant="permanent"
        sx={{ 
          display: { xs: "none", md: "block" }, 
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", background: "#0d1f0d", color: "#e0e0e0" } 
        }} open>
        {drawer}
      </Drawer>
      
      <Box component="main" className="admin-content" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: "100vh" }}>
        <Toolbar /> 
        <Outlet />
      </Box>

      <Dialog 
        open={logoutOpen} 
        onClose={function() { setLogoutOpen(false); }}
        PaperProps={{ sx: { borderRadius: 3, background: "#112211", color: "#e0e0e0", border: "1px solid #333" } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#f39c12" }}>
          <WarningAmberIcon /> Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#c0c0c0" }}>Are you sure you want to log out of the admin panel?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={function() { setLogoutOpen(false); }} 
            sx={{ color: "#8fbc8f", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={confirmLogout} 
            sx={{ fontWeight: 600 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;