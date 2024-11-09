import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CustomSignUpPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form and handle signup
  const handleSignUp = () => {
    const { email, phone } = formData;

    // Basic validation: email and phone
    if (!email || !phone) {
      setError('Please fill in both email and phone number.');
      return;
    }

    setError('');
    console.log('Sign-Up Data:', formData); // Here you would typically call an API for signing up
  };

  return (
    <div className="bg-light-primary min-h-screen flex justify-center items-center">
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 4,
            p: 4,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
          className="shadow-lg rounded-lg" // Tailwind class for shadow and rounded corners
        >
          <Typography variant="h4" gutterBottom className="text-primary-dark font-poppins">
            Sign In
          </Typography>

          {/* Display error message if any */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }} className="text-red-500">
              {error}
            </Typography>
          )}

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />

          {/* Phone Field */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            margin="normal"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />

          {/* Sign Up Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            sx={{ mt: 2 ,backgroundColor:"#2A9CA8"}}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </div>
  );
}
