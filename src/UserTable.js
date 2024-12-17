import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ListIcon from "@mui/icons-material/List";
import UserForm from "./UserForm";
import {
  fetchUsers,
  getIndividualRecord,
  deleteUser,
} from "./action/user_action";

const UserTable = ({
  users,
  totalCount,
  loading,
  fetchUsers,
  deleteUser,
  getIndividualRecord,
  individualUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isCreateOrEdit, setCreateOrEdit] = useState("");
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = () => {
    setCreateOrEdit("create");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleMouseEnter = (id) => setHoveredUserId(id);
  const handleMouseLeave = () => setHoveredUserId(null);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit button clicked for user ID: ", id);
    setDialogOpen(true);
    setCreateOrEdit("edit");
    getIndividualRecord(id);
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Users</Typography>

          <Box display="flex" gap={1}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
            >
              Create User
            </Button>
          </Box>
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="View Tabs"
        >
          <Tab icon={<TableRowsIcon />} iconPosition="start" label="Table" />
          <Tab icon={<ListIcon />} iconPosition="start" label="Card" />
        </Tabs>
      </Paper>

      {filteredUsers.length <= 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tabValue === 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={user.avatar} alt={user.first_name} />
                          <Typography>{user.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box display="flex" flexWrap="wrap" gap={2}>
              {currentUsers.map((user) => (
                <Paper
                  key={user.id}
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 200,
                    position: "relative",
                  }}
                  elevation={3}
                >
                  <Box
                    onMouseEnter={() => handleMouseEnter(user.id)}
                    onMouseLeave={handleMouseLeave}
                    sx={{ position: "relative" }}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.first_name}
                      sx={{ width: 100, height: 100, cursor: "pointer" }}
                    />

                    {hoveredUserId === user.id && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                          borderRadius: "50%",
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            sx={{
                              backgroundColor: "#9c8ef7",
                              color: "#fff",
                              "&:hover": { backgroundColor: "#8577d1" },
                            }}
                            onClick={() => handleEdit(user.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            sx={{
                              backgroundColor: "#ff5252",
                              color: "#fff",
                              "&:hover": { backgroundColor: "#e04848" },
                            }}
                            onClick={() => deleteUser(user.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>

                  <Typography variant="h6" mt={1}>
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={2}
            gap={1}
          >
            <Button
              size="small"
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </Button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  size="small"
                  variant={currentPage === page ? "contained" : "outlined"}
                  color={currentPage === page ? "primary" : "default"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              )
            )}

            {/* Next Button */}
            <Button
              size="small"
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </Button>
          </Box>
        </>
      )}

      {isDialogOpen && (
        <UserForm
          mode={isCreateOrEdit}
          userData={individualUser}
          open={isDialogOpen}
          onCancel={handleDialogClose}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  users: state.userDetails.users,
  individualUser: state.userDetails.individualUser,
  totalCount: state.userDetails.totalCount,
  loading: state.userDetails.loading,
});

const mapDispatchToProps = {
  fetchUsers,
  getIndividualRecord,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
