import React, { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  Typography,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateUserDetails, createUser } from "./action/user_action";
import { connect } from "react-redux";
import _ from "lodash";

function UserForm({
  open,
  mode = "create",
  userData = null,
  onSubmit,
  onCancel,
  updateUserDetails,
  createUser,
  indivloading,
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  console.log(userData, "USER DATA", _.isEmpty(userData));
  // Populate data for Edit mode
  useEffect(() => {
    if (mode === "edit" && userData) {
      console.log(userData, "******");
      setFormData(userData);
    }
  }, [mode, userData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = () => {
    console.log(formData, "FORM DATA");
    if (mode === "edit") {
      updateUserDetails(userData.id, formData); // Call the updateUserDetails action
    } else {
      createUser(formData); // Call the createUser action
    }
    onCancel(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {mode === "create" ? "Create New User" : "Edit User"}
        </Typography>
        <IconButton aria-label="close" onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {_.isEmpty(userData) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="first_name"
            value={formData.first_name}
            placeholder="Please enter first name"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            placeholder="Please enter last name"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            placeholder="Please enter email"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Profile Image Link"
            name="avatar"
            value={formData.avatar}
            placeholder="Please enter profile image link"
            onChange={handleChange}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onCancel} color="inherit" variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  indivloading: state.userDetails.loading,
});

const mapDispatchToProps = {
  updateUserDetails,
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
