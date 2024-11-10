import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import themehook from "./AuthContext";

export default function LoginPage() {
  const { setuserdata, setusername } = themehook();
  const theme = useTheme();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:3000/auth/login";

    try {
      const response = await axios.post(apiUrl, loginData);

      if (response.data.status === true) {
        toast.success("Login successful!");
        // console.log("User Data:", response.data.existUser);
        localStorage.setItem("user", JSON.stringify(response?.data?.existUser));
        setuserdata(response?.data?.existUser);
        setusername(response?.data?.existUser?.username);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Error logging in. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Box
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "400px",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
        }}
        className="shadow-lg rounded-lg"
      >
        <form onSubmit={handleLogin}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "black", textAlign: "center", mb: 2 }}
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, backgroundColor: "#2A9CA8" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
