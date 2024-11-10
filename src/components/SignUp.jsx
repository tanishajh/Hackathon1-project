import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CustomSignUpPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    vegNonVeg: "", // preference is initialized as empty string to ensure no default selection
    password: "", // added password field
  });
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes timer for OTP
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userdata, setuserdata] = useState();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "vegNonVeg") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle SignUp submission
  const handleSignUp = async () => {
    const { username, email, mobile, address, vegNonVeg, password } = formData;

    // Basic validation
    if (!username || !email || !mobile || !address || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signUp",
        formData
      );
      console.log(response.data.status);

      if (response.data.status) {
        setuserdata(response.data.user._id);
        setIsSignedUp(true);
        setIsOtpSent(true);
        startTimer(); // Start timer for OTP
      } else {
        toast.error("Error signing up. Please try again.");
      }
    } catch (err) {
      toast.error("Error signing up. Please try again.");
    }
  };

  // Start OTP timer countdown
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/verifyOtp/${userdata}`,
        { otp }
      );
      if (response.data.status787866) {
        toast("OTP verified successfully!");
        navigate("/login");
      } else {
        setOtpError("Invalid OTP, please try again.");
      }
    } catch (err) {
      setOtpError("Error verifying OTP, please try again.");
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/resendOtp",
        { mobile: formData.mobile }
      );
      if (response.data.success) {
        setTimer(120); // Reset timer to 2 minutes
        startTimer();
        setOtpError("");
      }
    } catch (err) {
      setOtpError("Error resending OTP, please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        {!isOtpSent ? (
          <>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>

            {/* Display error message if any */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {/* Signup Form */}
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="dense"
            />
            <Typography variant="h7" sx={{ mt: 2 }}>
              Select Preference:
            </Typography>
            <RadioGroup
              name="vegNonVeg"
              value={formData.vegNonVeg}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value="0" control={<Radio />} label="Veg" />
              <FormControlLabel value="1" control={<Radio />} label="Non-Veg" />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSignUp}
              sx={{ mt: 2, backgroundColor: "#2A9CA8" }}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <div>
            <Typography variant="h5" gutterBottom>
              Verify OTP
            </Typography>

            {/* OTP Input */}
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              margin="normal"
              error={!!otpError}
              helperText={otpError}
            />

            {/* Timer and Resend Option */}
            <Typography variant="body1" sx={{ mt: 2 }}>
              Time remaining: {Math.floor(timer / 60)}:{timer % 60}
            </Typography>
            {timer === 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleResendOtp}
                sx={{ mt: 2 }}
              >
                Resend OTP
              </Button>
            )}

            {/* OTP Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleOtpSubmit}
              sx={{ mt: 2 }}
              disabled={timer === 0}
            >
              Verify OTP
            </Button>
          </div>
        )}
      </Box>
    </Container>
  );
}
